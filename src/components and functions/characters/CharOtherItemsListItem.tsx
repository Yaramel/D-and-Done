/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

// importa dinamicamente o logo
const images = import.meta.glob("/src/assets/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const logoUrl = images["/src/assets/logo.png"] || "";

interface Inputs {
  itemInfo: any;
  isEquiped: boolean;
}

interface SpellInputs {
  itemInfo: any;
}

export function CharEquipmentListItem({ itemInfo, isEquiped }: Inputs) {
  return (
    <div className="rounded equipmentBoard p-2 my-1">
      <div className="container">
        <div className="row">
          <div className="col-md-1 d-flex align-items-center">
            <img
              className="noBackground"
              src={logoUrl}
              alt="Logo"
              width="30"
              height="30"
            />
          </div>
          <div className="col-md-3 d-flex align-items-center">
            <a
              href={
                itemInfo
                  ? `/equipment/${itemInfo.index.replaceAll("/", "")}`
                  : "#"
              }
              className="custom-link"
            >
              {itemInfo && itemInfo.name ? itemInfo.name : "-"}
            </a>
          </div>
          <div className="col-md-3 d-flex align-items-center">
            {itemInfo && itemInfo.armor_category
              ? itemInfo.armor_category === "Shield"
                ? "+2"
                : "" + (itemInfo.armor_class ? itemInfo.armor_class.base : "-")
              : itemInfo.damage
              ? itemInfo.damage.damage_dice +
                " " +
                itemInfo.damage.damage_type.name
              : ""}
          </div>
          <div className="col-md-3 d-flex align-items-center">
            {isEquiped === true
              ? "Equiped"
              : isEquiped === false
              ? "Not Equiped"
              : ""}
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <a
              href={
                itemInfo
                  ? `/equipment/${itemInfo.index.replaceAll("/", "")}`
                  : "#"
              }
              className="btn btn-outline-info"
            >
              More Info
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CharSpellListItem({ itemInfo }: SpellInputs) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="rounded equipmentBoard p-2 my-1">
      <div className="container">
        <div className="row">
          <div className="col-md-2 d-flex align-items-center">
            <img
              className="noBackground"
              src={logoUrl}
              alt="Logo"
              width="30"
              height="30"
            />
            <div
              className="d-flex align-items-center m-2"
              style={{ fontSize: "small" }}
            >
              {itemInfo &&
                (itemInfo.level === "0"
                  ? "Cantrip"
                  : itemInfo.level === "1"
                  ? `${itemInfo.level}st`
                  : itemInfo.level === "2"
                  ? `${itemInfo.level}nd`
                  : itemInfo.level === "3"
                  ? `${itemInfo.level}rd`
                  : `${itemInfo.level}th`)}
            </div>
          </div>
          <div className="col-md-3 d-flex align-items-center ">
            <a
              href={
                itemInfo?.index
                  ? `/spells/${itemInfo.index.replaceAll("/", "")}`
                  : "#"
              }
              className="custom-link"
            >
              {itemInfo && itemInfo.name}
            </a>
          </div>
          <div className="col-md-2 d-flex align-items-center">
            {itemInfo &&
            itemInfo.range &&
            itemInfo.area_of_effect
              ? `${itemInfo.range} / ${itemInfo.area_of_effect.type} ${itemInfo.area_of_effect.size}ft`
              : itemInfo?.range || "-"}
          </div>
          <div className="col-md-2 d-flex align-items-center">
            {itemInfo && itemInfo.dc
              ? `${itemInfo.dc.dc_type.name} for ${itemInfo.dc.dc_success}`
              : itemInfo?.attack_type || "-"}
          </div>
          <div className="col-md-1 d-flex align-items-center">
            {itemInfo && itemInfo.damage
              ? itemInfo.damage.damage_at_slot_level
                ? `${itemInfo.damage.damage_at_slot_level[itemInfo.level]} / ${itemInfo.damage.damage_type.name}`
                : itemInfo.damage.damage_at_character_level
                ? `${itemInfo.damage.damage_at_character_level[1]} / ${itemInfo.damage.damage_type.name}`
                : "-"
              : "-"}
          </div>
          <div className="col-md-1 d-flex align-items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleDescription();
              }}
              className="icon-button"
              aria-label={
                showDescription ? "Hide description" : "Show description"
              }
            >
              {showDescription ? (
                <AiFillCaretUp className="icon-link" size={40} />
              ) : (
                <AiFillCaretDown className="icon-link" size={40} />
              )}
            </button>
          </div>

          {showDescription && (
            <div>
              <hr className="my-5 separator" style={{ borderWidth: "2px" }} />
              <p>{itemInfo && itemInfo.desc}</p>
              <a
                href={
                  itemInfo
                    ? `/spells/${itemInfo.index.replaceAll("/", "")}`
                    : "#"
                }
                className="btn btn-outline-info"
              >
                More Info
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
