/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import BreadcrumbNav from "../../assetsForDesign/BreabcrumbNav";

const lightArmorDesc = `Made from supple and thin materials, light armor favors agile adventurers since it offers some protection without sacrificing mobility. If you wear light armor, you add your Dexterity modifier to the base number from your armor type to determine your Armor Class.`;
const mediumArmorDec = `Medium armor offers more protection than light armor, but it also impairs movement more. If you wear medium armor, you add your Dexterity modifier, to a maximum of +2, to the base number from your armor type to determine your Armor Class.`;
const heavyArmorDec = `Of all the armor categories, heavy armor offers the best protection. These suits of armor cover the entire body and are designed to stop a wide range of attacks. Only proficient warriors can manage their weight and bulk.
Heavy armor doesn’t let you add your Dexterity modifier to your Armor Class, but it also doesn’t penalize you if your Dexterity modifier is negative.`;


interface inputs {

    equipmentData: any;
    properties?: any[];

}

export default function EquipmentInfoBoard({ equipmentData }: inputs) {

    const [properties, setProperties] = useState([]);


    useEffect(() => {
        fetchPropsFromApi();
    }, []);

    const fetchPropsFromApi = async () => {
        try {
            if (equipmentData && equipmentData.properties.length > 0) {
                const propertyDescs = [];
                for (const property of equipmentData.properties) {
                    const propertyInfo = await getPropertiesInfo(property.index);
                    // Assuming propertyInfo is an array of objects with a 'desc' property
                    if (property.index != "special") {
                        propertyDescs.push(propertyInfo.desc);
                    }
                    else propertyDescs.push("SPECIAL");
                }
                setProperties(propertyDescs);
                console.log(properties);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (equipmentData.equipment_category.index == "weapon") {
        return (
            <div className="even-section">

                <BreadcrumbNav />
                <br />
                <WeaponInfoBoard equipmentData={equipmentData} properties={properties} />
            </div>

        );
    }

    else if (equipmentData.equipment_category.index == "armor" || equipmentData.equipment_category.index == "shields") {
        return (
            <div className="even-section">

                <BreadcrumbNav />
                <br />
                <ArmorInfoBoard equipmentData={equipmentData} properties={properties} />
            </div>

        );
    }

    else {
        return (
            <div className="even-section">

                <BreadcrumbNav />
                <br />
                <OtherInfoBoard equipmentData={equipmentData} properties={properties} />
            </div>

        );
    }
}

function WeaponInfoBoard({ equipmentData, properties }: inputs) {

    console.log(properties);

    return (


        <div className="container ">

            <h1 className="container titleText">{equipmentData.name}</h1>
            <br />

            <div className="panel-body inf-content rounded equipmentBoard p-5">
                <div className="row ">
                    <div className="col-md-8">
                        <div className="table-responsive ">

                            <div className="container ">
                                <div className="row">
                                    <div className="col-md-3">
                                        <strong>Item Category</strong>
                                        <p className="">{equipmentData.equipment_category.name ? equipmentData.equipment_category.name : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Weapon Category</strong>
                                        <p className="">{equipmentData.weapon_category ? equipmentData.weapon_category : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Attack Type</strong>
                                        <p className="">{equipmentData.weapon_range ? equipmentData.weapon_range : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Base Damage</strong>
                                        <p className="">{equipmentData.damage && equipmentData.damage.damage_dice && equipmentData.damage.damage_type ? equipmentData.damage.damage_dice + " " + equipmentData.damage.damage_type.name.toLowerCase() : "-"}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <strong>Range</strong>
                                        <p className="">{equipmentData.range.normal ? equipmentData.range.normal + "ft" : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Weight</strong>
                                        <p className="">{equipmentData.weight && equipmentData.weight != "-" ? equipmentData.weight + "oz" : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Cost</strong>
                                        <p className="">{equipmentData.cost ? equipmentData.cost.quantity + equipmentData.cost.unit : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Special</strong>
                                        <p className="">{equipmentData.special[0] ? "Check Description" : "-"}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <strong>Properties</strong>
                                        <p className="">{equipmentData.properties && equipmentData.properties.length ? (
                                            equipmentData.properties.map((item, index) => (
                                                <span key={index}>
                                                    {item.name}
                                                    {index < equipmentData.properties.length - 1 && ", "}
                                                </span>
                                            ))
                                        ) : "-"}</p>

                                    </div>
                                </div>
                            </div>

                            <hr className="my-5 separator" style={{ borderWidth: "3px" }} />

                            <section>
                                <div className="container equipment-description">
                                    {properties.map((property, index) => (

                                        <div key={index}>
                                            {property === "SPECIAL" ? '' : property} <br />
                                        </div>
                                    ))}
                                    {properties.map((property, index) => (

                                        <div key={index}>
                                            {property === "SPECIAL" ? <strong >Special: {equipmentData.special}</strong> : ''}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="col-md-4 noBackground">
                        <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ backgroundColor: "#0f0f0f", width: "400px" }}>
                            <img alt="" style={{ width: "400px" }} title="" className="img-thumbnail border-0" src={"/src/assets/equipment-schools/" + equipmentData.equipment_category.index + ".png"} equipmentData-original-title="EquipmentSchoolImage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

function ArmorInfoBoard({ equipmentData }: inputs) {

    return (


        <div className="container ">

            <h1 className="container titleText">{equipmentData.name}</h1>
            <br />

            <div className="panel-body inf-content rounded equipmentBoard p-5">
                <div className="row ">
                    <div className="col-md-8">
                        <div className="table-responsive ">

                            <div className="container ">
                                <div className="row">
                                    <div className="col-md-3">
                                        <strong>Item Category</strong>
                                        <p className="">{equipmentData.equipment_category.name ? equipmentData.equipment_category.name : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Armor Category</strong>
                                        <p className="">{equipmentData.armor_category ? equipmentData.armor_category : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Strength Requirement</strong>
                                        <p className="">{equipmentData.str_minimum ? equipmentData.str_minimum : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Stealth Disadvantage</strong>
                                        <p className="">{equipmentData ? (equipmentData.stealth_disadvantage ? "Yes" : "No") : "-"}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <strong>Weight</strong>
                                        <p className="">{equipmentData.weight && equipmentData.weight != "-" ? equipmentData.weight + "oz" : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Cost</strong>
                                        <p className="">{equipmentData.cost ? equipmentData.cost.quantity + equipmentData.cost.unit : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Armor Class</strong>
                                        <p className="">{(equipmentData.armor_category == "Shield" && equipmentData.armor_class) ? "+" + equipmentData.armor_class.base : (equipmentData.armor_class ? equipmentData.armor_class.base : "-")}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Dex Bonus</strong>
                                        <p className="">{equipmentData.armor_class ? (equipmentData.armor_class.dex_bonus ? (equipmentData.armor_class.max_bonus ? "+" + equipmentData.armor_class.max_bonus : "Unlimited") : "No") : "-"}</p>

                                    </div>

                                </div>
                                
                            </div>
                        </div>

                        <hr className="my-5 separator" style={{ borderWidth: "3px" }} />

                        <section>
                            <div className="container equipment-description">
                                {equipmentData.armor_category ? (equipmentData.armor_category == "Light" ? lightArmorDesc : (equipmentData.armor_category == "Medium" ? mediumArmorDec : heavyArmorDec)) : "-"}
                            </div>
                        </section>
                    </div>
                </div>
                <div className="col-md-4 noBackground">
                    <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ backgroundColor: "#0f0f0f", width: "400px" }}>
                        <img alt="" style={{ width: "400px" }} title="" className="img-thumbnail border-0" src={"/src/assets/equipment-schools/" + equipmentData.equipment_category.index + ".png"} equipmentData-original-title="EquipmentSchoolImage" />
                    </div>
                </div>
            </div>
        </div>


    );
}

function OtherInfoBoard({ equipmentData }: inputs) {

    return (


        <div className="container ">

            <h1 className="container titleText">{equipmentData.name}</h1>
            <br />

            <div className="panel-body inf-content rounded equipmentBoard p-5">
                <div className="row ">
                    <div className="col-md-8">
                        <div className="table-responsive ">

                            <div className="container ">
                                <div className="row">
                                    <div className="col-md-3">
                                        <strong>Category</strong>
                                        <p className="">{equipmentData.equipment_category.name ? equipmentData.equipment_category.name : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Specific Category</strong>
                                        <p className="">{equipmentData.vehicle_category ? equipmentData.vehicle_category : ( equipmentData.gear_category ? equipmentData.gear_category.name : (equipmentData.weapon_category ? equipmentData.weapon_category : "-"))}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Cost</strong>
                                        <p className="">{equipmentData.cost ? equipmentData.cost.quantity + equipmentData.cost.unit : "-"}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Weight</strong>
                                        <p className="">{equipmentData.weight ? equipmentData.weight + "oz" : "-"}</p>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-5 separator" style={{ borderWidth: "3px" }} />

                            <section>
                                <div className="container equipment-description">
                                    {equipmentData.desc}
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="col-md-4 noBackground">
                        <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ backgroundColor: "#0f0f0f", width: "400px" }}>
                            <img alt="" style={{ width: "400px" }} title="" className="img-thumbnail border-0" src={"/src/assets/equipment-schools/" + equipmentData.equipment_category.index + ".png"} equipmentData-original-title="EquipmentSchoolImage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

function getPropertiesInfo(propertyIndex: any) {
    return fetch(`https://www.dnd5eapi.co/api/weapon-properties/${propertyIndex}`)
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