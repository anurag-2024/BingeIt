import React from "react";

import Carousel from "../../../components/carousel/carousel";
import useFetch from "../../../hooks/usefetch";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/recommendations`);

    const title = "Recommendations";
    console.log(data);
    return (
            <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
       
    );
};

export default Recommendation;