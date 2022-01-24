import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetails([json.data.movie]);
    setLoading(false);
  };
  console.log(details);
  useEffect(getMovie, []);
  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          {details.map((detail) => (
            <div>
              <img src={detail.large_cover_image} />
              <h2>{detail.title_long}</h2>
              <dl>
                <dt>Rating</dt>
                <dd>{detail.rating}</dd>
                <dt>genres</dt>
                <dd>
                  <ul>
                    {detail.genres.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </dd>
              </dl>

              <h3>description</h3>
              <p>{detail.description_full}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Detail;
