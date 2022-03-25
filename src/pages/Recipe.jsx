import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");

    const fetchDetails = async () => {
        const api = await fetch(
            `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );

        const data = await api.json();
        setDetails(data);
    };

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt={details.title} />
            </div>
            <Info>
                <Button
                    className={activeTab === "instructions" ? "active" : ""}
                    onClick={(e) => setActiveTab("instructions")}
                >
                    Instructions
                </Button>
                <Button
                    className={activeTab === "ingredients" ? "active" : ""}
                    onClick={(e) => setActiveTab("ingredients")}
                >
                    Ingredients
                </Button>

                {activeTab === "instructions" && (
                    <div>
                        <h4
                            dangerouslySetInnerHTML={{
                                __html: details.summary,
                            }}
                        ></h4>
                        <h4
                            style={{ "margin-top": "2rem" }}
                            dangerouslySetInnerHTML={{
                                __html: details.instructions,
                            }}
                        ></h4>
                    </div>
                )}
                {activeTab === "ingredients" && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => {
                            return (
                                <LiStyle key={ingredient.id}>
                                    {ingredient.original}
                                </LiStyle>
                            );
                        })}
                    </ul>
                )}
            </Info>
        </DetailWrapper>
    );
}

const DetailWrapper = styled.div`
    margin-top: 5rem;
    margin-bottom: 5rem;
    display: flex;

    .active {
        background: linear-gradient(35deg, #949494, #313131);
        color: white;
    }

    h2 {
        margin-bottom: 2rem;
    }

    li {
        margin-left: 2rem;
    }

    img {
        width: 25rem;
        border-radius: 2rem;
    }
`;

const LiStyle = styled.li`
    font-size: 1.2rem;
    line-height: 2.5rem;
    margin-left: 2rem;
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
`;

const Info = styled.div`
    margin-left: 2rem;
`;

export default Recipe;
