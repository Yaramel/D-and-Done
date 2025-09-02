/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import BreadcrumbNav from "../../assetsForDesign/BreabcrumbNav.js";
import DDoneLoading from '../../assetsForDesign/DDoneLoading.js';


interface inputs {

    classData: any;
    features?: [];


}

export default function ClassInfoBoard({ classData }: inputs) {

    const [features, setFeatures] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    useEffect(() => {
        fetchFeaturesFromApi();
    }, []);

    const fetchFeaturesFromApi = async () => {
        setIsLoading(true);
        setLoadingMessage("Fetching Class Info, please wait.");
        try {
            if (classData) {
                const classFeatures = [];
                const classInfo = await getLevelsInfo(classData.index);

                for (const level of classInfo) {
                    for (const feature of level.features) {
                        const featureInfo = await getFeatureInfo(feature.index);

                        classFeatures.push([level.level, feature.name, featureInfo.desc[0]]);
                    }
                }
                setFeatures(classFeatures);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setTimeout(() => { setIsLoading(false) }, 500);
        }
    };

const classImages = import.meta.glob("/src/assets/classes/illustrations/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;


const ClassUrl = classImages[`/src/assets/classes/illustrations/${classData.name.toLowerCase()}.png`] || "";

    return (


        <div className="even-section">

            <BreadcrumbNav />
            <br />

            <div className="container ">

                <h1 className="container titleText">{classData.name}</h1>
                <br />

                <div className="panel-body inf-content rounded spellBoard p-5 background-camp-image-with-opacity"

                    style={{
                        backgroundImage: `url(${ClassUrl})`,
                        color: 'white',
                    }}>

                    <div className="row ">
                        <div className="">
                            <div className="table-responsive ">

                                <div className="container ">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <strong>Hit Die</strong>
                                            <p className="">{classData.hit_die ? "d" + classData.hit_die : "-"}</p>
                                        </div>
                                        <div className="col-md-3">
                                            <strong>Saving Throws</strong>
                                            <p className="">{classData.saving_throws && classData.saving_throws.length > 0 ? (
                                                classData.saving_throws.map((item, index) => (
                                                    <span key={index}>
                                                        {item.name}
                                                        {index < classData.saving_throws.length - 1 && ", "}
                                                    </span>
                                                ))) : "-"}</p>
                                        </div>
                                        <div className="col-md-7">
                                            <strong>Skill Proeficiencies</strong>
                                            <p className="">{classData.proficiency_choices ? classData.proficiency_choices[0].desc : "-"}</p>
                                        </div>


                                    </div>

                                    <section>
                                        <strong>Item Proeficiencies:</strong>
                                        <p className="">{classData.proficiencies ? (
                                            classData.proficiencies.map((item, index) => (
                                                <span key={index}>
                                                    {!item.name.includes("Saving Throw") ? item.name : ""}
                                                    {index < classData.proficiencies.length - 3 && ", "}
                                                </span>
                                            ))) : "-"}</p>
                                    </section>
                                </div>



                                <hr className="my-5 separator" style={{ borderWidth: "3px" }} />



                                <section>
                                    <div className="container class-description">
                                        <div className="row">
                                            <div>
                                                <strong>Feature List:</strong>
                                                <p className="">{features && features.length ? (
                                                    features.map((item, index) => (
                                                        <span key={index}>
                                                            <strong>{"Level " + item[0] + ": "}</strong>

                                                            {item[1]}
                                                            <br />
                                                            {item[2]}
                                                            <br />
                                                            <br />
                                                            {index < features.length - 1}
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
                                {/* <img alt="" style={{ width: "400px" }} title="" className="img-thumbnail border-0" src={"/src/assets/class-schools/" + classData.class_category.index + ".png"} classData-original-title="ClassSchoolImage" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DDoneLoading isLoading={isLoading} message={loadingMessage} />
        </div>

    );

}

function getLevelsInfo(classIndex: any) {
    return fetch(`https://www.dnd5eapi.co/api/classes/${classIndex}/levels`)
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

function getFeatureInfo(featureIndex: any) {
    return fetch(`https://www.dnd5eapi.co/api/features/${featureIndex}`)
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