/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import BreadcrumbNav from "../../assetsForDesign/BreabcrumbNav";

interface inputs {

    raceData: any;
    traits?: any[];


}

export default function RaceInfoBoard({ raceData }: inputs) {

    const [traits, setTraits] = useState([]);


    useEffect(() => {
        fetchPropsFromApi();
    }, []);

    const fetchPropsFromApi = async () => {
        try {
            if (raceData && raceData.traits.length > 0) {
                const traitsDescs = [];
                for (const trait of raceData.traits) {
                    const traitsInfo = await getTraitsInfo(trait.index);
                    traitsDescs.push([traitsInfo.name, traitsInfo.desc[0]]);
                    setTraits(traitsDescs);

                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log(traits);
    return (


        <div className="even-section">

            <BreadcrumbNav />
            <br />

            <div className="container ">

                <h1 className="container titleText">{raceData.name}</h1>
                <br />

                <div className="panel-body inf-content rounded spellBoard p-5">
                    <div className="row ">
                        <div className="col-md-8">
                            <div className="table-responsive ">

                                <div className="container ">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <strong>Speed</strong>
                                            <p className="">{raceData.speed ? raceData.speed + " tf/turn" : "-"}</p>
                                        </div>
                                        <div className="col-md-3">
                                            <strong>Size</strong>
                                            <p className="">{raceData.size ? raceData.size : "-"}</p>
                                        </div>
                                        <div className="col-md-3">
                                            <strong>Ability Bonuses</strong>
                                            <p className="">{raceData.ability_bonuses && raceData.ability_bonuses.length == 6 ? "+1 to ALL" : (raceData.ability_bonuses && raceData.ability_bonuses.length ? (
                                                raceData.ability_bonuses.map((item, index) => (
                                                    <span key={index}>
                                                        +{item.bonus} {item.ability_score.name}
                                                        {index < raceData.ability_bonuses.length - 1 && ", "}
                                                    </span>
                                                ))) : "-")}</p>
                                        </div>
                                        <div className="col-md-3">
                                            <strong>Proeficiencies</strong>
                                            <p className="">{raceData.starting_proficiencies && raceData.starting_proficiencies.length ? (
                                                raceData.starting_proficiencies.map((item, index) => (
                                                    <span key={index}>
                                                        {item.name}
                                                        {index < raceData.starting_proficiencies.length - 1 && ", "}
                                                    </span>
                                                ))) : "-"}</p>
                                        </div>
                                    </div>


                                </div>

                                <hr className="my-5 separator" style={{ borderWidth: "3px" }} />

                                <section>
                                    <div className="container race-description">

                                        <div className="row">
                                            <div>
                                                <strong>Alignment</strong>
                                                <p className="">{raceData.alignment ? raceData.alignment : "-"}</p>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div>
                                                <strong>Size Description</strong>
                                                <p className="">{raceData.size_description ? raceData.size_description : "-"}</p>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div>
                                                <strong>Languages</strong>
                                                <p className="">{raceData.language_desc ? raceData.language_desc : "-"}</p>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div>
                                                <strong>Trait List:</strong>
                                                <p className="">{traits && traits.length ? (
                                                    traits.map((item, index) => (
                                                        <span key={index}>
                                                            <strong>{item[0] + ":"}</strong>
                                                            <br />
                                                            {item[1]}
                                                            <br />
                                                            {index < traits.length - 1}
                                                        </span>
                                                    ))) : "-"}</p>
                                            </div>
                                        </div>

                                    </div>
                                </section>
                            </div>
                        </div>
                        <div className="col-md-4 noBackground">
                            <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ backgroundColor: "#0f0f0f", width: "400px" }}>
                                {/* <img alt="" style={{ width: "400px" }} title="" className="img-thumbnail border-0" src={"/src/assets/race-schools/" + raceData.race_category.index + ".png"} raceData-original-title="RaceSchoolImage" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

function getTraitsInfo(traitIndex: any) {
    return fetch(`https://www.dnd5eapi.co/api/traits/${traitIndex}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}

