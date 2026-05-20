function Rating({ score }) {

    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (score >= i + 1) {
            // Full star
            stars.push(<i key={i} className="bi bi-star-fill"></i>);
        } else if (score >= i + 0.5) {
            // Half star
            stars.push(<i key={i} className="bi bi-star-half"></i>);
        } else {
            // Empty star
            stars.push(<i key={i} className="bi bi-star"></i>);
        }
    }

    return (
        <div>
            {stars}
        </div>
    )
}
export default Rating;