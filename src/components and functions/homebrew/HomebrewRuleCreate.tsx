/* eslint-disable @typescript-eslint/no-explicit-any */
import BreadcrumbNav from "../assetsForDesign/BreabcrumbNav.tsx";
import { useState } from "react";
import DDoneTextInput from "../assetsForDesign/DDoneTextInput.tsx";
import DDoneDropdown from "../assetsForDesign/DDoneDropdown.tsx";
import DDoneButton from "../assetsForDesign/DDoneButton.tsx";
import { useUser } from "../../UserContext.tsx"; // Import useUser
import { postHomebrewRuleInfo } from "../FetchLogic.tsx";
import {
  ConfirmationPopUp,
  InformationPopUp,
} from "../assetsForDesign/DDoneConfirmation.tsx";
import DDoneLoading from "../assetsForDesign/DDoneLoading.tsx";

// importa dinamicamente imagens
const miscImages = import.meta.glob("/src/assets/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export default function HomebrewRuleCreate() {
  const { user } = useUser(); // Access user from context

  if (user) {
    console.log(user[0].username);
  }

  const [name, setName] = useState("");
  const [index, setIndex] = useState("");
  const handleNameChange = (value: string) => {
    setName(value);
    if (user != null) {
      setIndex(
        (value + "-by-" + user[0].username)
          .replace(/\s+/g, "-")
          .toLowerCase()
      );
    }
  };

  const [desc, setDesc] = useState("");
  const handleDescChange = (value: string) => {
    setDesc(value);
  };

  const [category, setCategory] = useState("");
  const rulesOptions = [
    "Adventuring",
    "Appendix",
    "Combat",
    "Equipment",
    "Spellcasting",
    "Using Ability",
  ];

  const handleDropdownChange = (value: string) => {
    setCategory(value);
  };

  const showFailMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 1000);
  };

  const handleSave = async () => {
    setLoading(true);

    const nameCheck = name != "";
    const descCheck = desc != "";
    const catCheck = category != "";

    if (nameCheck && descCheck && catCheck) {
      try {
        await postHomebrewRuleInfo(
          name,
          user[0].username,
          index,
          desc,
          category
        );
        setLoading(false);
        setSuccess(true);
        showSuccessMessage("Rule saved successfully!", "/rules");
      } catch (error) {
        setLoading(false);
        setError(true);
        showFailMessage("Error while posting");
        setTimeout(() => {
          setError(false);
        }, 1500);
        console.log(error.toString().split(" || ")[1]);
      }
    } else {
      setLoading(false);
      setShowConfirmation(false);
      setShowWarn(true);
    }
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [showWarn, setShowWarn] = useState(false);

  const handleConfirmSave = () => {
    setShowConfirmation(false);
    handleSave();
  };

  const handleCancelSave = () => {
    setShowConfirmation(false);
  };

  const handleCancelWarn = () => {
    setShowWarn(false);
  };

  const showSuccessMessage = (message: string, url: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  };

  // resolve imagem "nop.png"
  const nopUrl = miscImages["/src/assets/nop.png"];

  if (!user || !user[0].isMaster) {
    return (
      <div
        className="text-center background-camp-image"
        style={{
          backgroundImage: `url(${nopUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          color: "white",
        }}
      >
        <h1
          style={{
            marginTop: "25%",
            filter:
              "drop-shadow(1px 1px 1px black) drop-shadow(-1px -1px 1px black)",
          }}
        >
          Please log in as Master to create homebrew rules.
        </h1>
      </div>
    );
  }

  return (
    <div className="even-section">
      <ul className="custom-list">
        <li>
          <BreadcrumbNav />
          <br />
          <div className="container">
            <h1 className="container titleText">Create your Rule</h1>
          </div>
        </li>
      </ul>
      <DDoneTextInput
        width="300px"
        placeholder="Rule's Name"
        value={name}
        onChange={handleNameChange}
      />
      <br />
      <DDoneDropdown
        width="300px"
        options={rulesOptions}
        value={category}
        onChange={handleDropdownChange}
      />
      <br />
      <DDoneTextInput
        width="1000px"
        placeholder="Write your rule's Description"
        value={desc}
        onChange={handleDescChange}
      />
      <br />
      <DDoneButton
        width="100px"
        height={2}
        onClick={() => setShowConfirmation(true)}
        text="Save"
      />
      {showConfirmation && (
        <ConfirmationPopUp
          message="Are you sure you want to save this rule?"
          onConfirm={handleConfirmSave}
          onCancel={handleCancelSave}
        />
      )}
      {isLoading && (
        <DDoneLoading
          isLoading={isLoading}
          isOK={isSuccess}
          isFail={isError}
          message={
            isLoading ? "Saving..." : isSuccess ? successMessage : "Failed to save"
          }
        />
      )}
      {isSuccess && (
        <ConfirmationPopUp
          message=""
          successMessage={successMessage}
          isSuccess={true}
        />
      )}
      {isError && (
        <ConfirmationPopUp
          message=""
          successMessage={successMessage}
          isSuccess={true}
        />
      )}
      {showWarn && (
        <InformationPopUp
          message="Missing Required Information"
          onConfirm={handleCancelWarn}
        />
      )}
    </div>
  );
}
