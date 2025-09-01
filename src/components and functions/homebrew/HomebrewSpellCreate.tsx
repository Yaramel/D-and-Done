// CreateHomebrewSpell.tsx
import BreadcrumbNav from "../assetsForDesign/BreabcrumbNav.tsx";
import { useEffect, useState } from 'react';
import DDoneTextInput from '../assetsForDesign/DDoneTextInput.tsx';
import DDoneTextArea from '../assetsForDesign/DDoneTextArea.tsx';
import DDoneDropdown from '../assetsForDesign/DDoneDropdown.tsx';
import DDoneButton from '../assetsForDesign/DDoneButton.tsx';
import DDoneImageToggle from '../assetsForDesign/DDoneImageToggle.tsx';
import { useUser } from '../../UserContext.tsx'; // Import useUser
import { postHomebrewSpellInfo } from "../FetchLogic.tsx";
import DDoneCheckBox from "../assetsForDesign/DDoneCheckBox.tsx";
import DDoneLoading from '../assetsForDesign/DDoneLoading.js';
import { ConfirmationPopUp, InformationPopUp } from "../assetsForDesign/DDoneConfirmation.tsx";
import { useNavigate } from 'react-router-dom';



export default function HomebrewSpellCreate() {
  const navigate = useNavigate();
  const goToSpells = () => {
    navigate('/spells', { state: { isHomebrew: true } });
  };
  const { user } = useUser(); // Access user from context

  // -------------------------------------------------------------
  const [name, setName] = useState('');
  const [index, setIndex] = useState('');
  const handleNameChange = (value: string) => {
    setName(value);
    setIndex((value + "-by-" + user[0].username).replace(/\s+/g, "-").toLowerCase());
  };

  // -------------------------------------------------------------
  const levelOptions = ['Cantrip', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const [level, setLevel] = useState('Select');
  const handleLevelChange = (value: string) => {
    if (value == 'Cantrip') {
      setLevel('0');
    }
    else {
      setLevel(value);
    }
  };

  // -------------------------------------------------------------
  const schoolOptions = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];
  const [school, setSchool] = useState('Select');
  const [schoolPic, setSchoolPic] = useState('default');
  const handleSchoolChange = (value: string) => {
    setSchool(value);
    setSchoolPic(value);
  };


  // const [schoolJsonString, setSchoolJsonString] = useState(`{}`);
  const [schoolJson, setSchoolJson] = useState({});

  useEffect(() => {
    if (school !== '') {
      const lower_value: string = school.toLowerCase();

      const jsonString = `
      {
            "index": "${lower_value}",
            "name": "${school}",
            "url": "/api/magic-school/${school}"
      }
      `;

      // setSchoolJsonString(jsonString);

      // Parse JSON string to object and set the state
      try {
        const parsedJson = JSON.parse(jsonString);
        setSchoolJson(parsedJson);
        console.log(parsedJson);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else {
      // setSchoolJsonString(`{}`);
      setSchoolJson({});
    }
  }, [school]);


  // -------------------------------------------------------------
  const [duration, setDuration] = useState('Select');
  const handleDurationChange = (value: string) => {
    setDuration(value);
  };


  // -------------------------------------------------------------
  const [range, setRange] = useState('');
  const handleRangeChange = (value: string) => {
    setRange(value);
  };

  // -------------------------------------------------------------
  const [area, setArea] = useState('');
  const handleAreaChange = (value: string) => {
    setArea(value);
  };

  const [areaType, setAreaType] = useState('Select');
  const handleAreaTypeChange = (value: string) => {
    if (value === "---") {
      setAreaType('');
    } else {
      setAreaType(value);
    }
  };
  const areaTypeOptions = ['---', 'Cube', 'Square', 'Cone', 'Beam'];


  // const [areaJsonString, setAreaJsonString] = useState(`{}`);
  const [areaJson, setAreaJson] = useState({});

  useEffect(() => {
    if (area !== '' && areaType !== '' && areaType !== 'Select') {
      const value_lower = areaType.toLowerCase();
      const jsonString = `
      {
          "type": "${value_lower}",
          "size": "${area}" 
      }
      `;

      // setAreaJsonString(jsonString);

      // Parse JSON string to object and set the state
      try {
        const parsedJson = JSON.parse(jsonString);
        setAreaJson(parsedJson);
        console.log('Parsed area JSON:', parsedJson);
      } catch (error) {
        console.error('Error parsing area JSON:', error);
      }
    } else {
      // setAreaJsonString(`{}`);
      setAreaJson({});
    }
  }, [area, areaType]);


  // -------------------------------------------------------------
  const castingTimeOptions = ['Action', 'Bonus Action', 'Reaction', '1 minute', '10 minutes', 'Longer**', 'Varies**'];
  const [castingTime, setCastingTime] = useState('Select');
  const handleCastingTimeChange = (value: string) => {
    setCastingTime(value);
  };

  // -------------------------------------------------------------

  const [desc, setDesc] = useState('');
  const handleDescChange = (value: string) => {
    setDesc(value);
  };
  // -------------------------------------------------------------

  const durationOptions = ['Instantaneous', '1 round', '1minutes', '10 minutes', '1 hour', 'until short rest', 'until long rest', 'Varies**'];
  const diceOptions = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
  const damageTypeOptions = ['---', 'Acid', 'Bludgeoning', 'Piercing', 'Slashing', 'Fire', 'Force', 'Cold', 'Poison', 'Lightning', 'Thunder', 'Radiant', 'Psychic', 'Necrosis', 'Varies**',];

  const [diceAmount, setDiceAmount] = useState('');
  const handleDiceAmountChange = (value: string) => {
    setDiceAmount(value);
  };

  const [dice, setDice] = useState('Die');
  const handleDiceChange = (value: string) => {
    setDice(value);
  };

  const [damage_at_slot_level, setDamage_at_slot_level] = useState(['']);
  useEffect(() => {
    setDamage_at_slot_level([`${diceAmount} ${dice}`]);
  }, [diceAmount, dice]);


  const [damageType, setDamageType] = useState('Select');

  // const [damageJsonString, setDamageJsonString] = useState(`{}`);
  const [damageJson, setDamageJson] = useState({});
  const handleDamageTypeChange = ((value: string) => {
    if (value == "---" || value == "Varies**" || value == "Select") {
      setDamageType('');
    }
    else {
      setDamageType(value);
    }
  });

  useEffect(() => {
    if (damageType !== '') {
      const lower_value: string = damageType.toLowerCase();

      const jsonString = `
      {

          "damage_type": {
            "index": "${lower_value}",
            "name": "${damageType}",
            "url": "/api/damage-types/${lower_value}"
          }
        
      }
      `;

      // setDamageJsonString(jsonString);

      // Parse JSON string to object and set the state
      try {
        const parsedJson = JSON.parse(jsonString);
        setDamageJson(parsedJson);
        console.log(parsedJson);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else {
      // setDamageJsonString(`{}`);
      setDamageJson({});
    }
  }, [damageType]);
  // -------------------------------------------------------------
  const attackSaveOptions = ['---', 'Attack Roll', 'Save Throw'];
  const attackTypeOptions = ['Meelee', 'Ranged'];
  const saveThrowOptions = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHAR', 'Varies**'];



  const [attackSave, setAttackSave] = useState('Select');
  const [attackType, setAttackType] = useState('Select');
  const [saveThrow, setSaveThrow] = useState('Select');

  const [isAttack, setIsAttack] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const handleAttackSaveChange = (value: string) => {
    if (value == "Select") {
      value = "";
    }
    setAttackSave(value);
    if (value == 'Attack Roll') {
      setIsAttack(true);
      setIsSave(false);
    }
    else if (value == "Save Throw") {
      setIsAttack(false);
      setIsSave(true);
    }
    else {
      setIsAttack(false);
      setIsSave(false);
    }
  };


  const handleAttackTypeChange = (value: string) => {
    if (value == "Select") {
      setAttackType("");
    }
    setAttackType(value);
  };



  // const [dcJsonString, setDCJsonString] = useState(`{}`);
  const [dcJson, setDCJson] = useState({});
  const handleSaveThrowChange = (value: string) => {
    if (value == "Select") {
      setSaveThrow("");
    }
    setSaveThrow(value);
  };

  useEffect(() => {
    if (saveThrow !== '') {
      const lower_value: string = saveThrow.toLowerCase();

      const jsonString = `
      {

          "dc_type": {
            "index": "${lower_value}",
            "name": "${saveThrow}",
            "url": "/api/ability-scores/${lower_value}"
          }
        
      }
      `;

      // setDCJsonString(jsonString);

      // Parse JSON string to object and set the state
      try {
        const parsedJson = JSON.parse(jsonString);
        setDCJson(parsedJson);
        console.log(parsedJson);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else {
      // setDCJsonString(`{}`);
      setDCJson({});
    }
  }, [saveThrow]);



  // -------------------------------------------------------------
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);


  const handleComponents = (comp: string) => (selected: boolean) => {
    setSelectedComponents(prevSelectedComponents => {
      if (selected) {
        return [...prevSelectedComponents, comp];
      } else {
        return prevSelectedComponents.filter(c => c !== comp);
      }
    });
  };

  // const [selectedComponentsJsonString, setSelectedComponentsJsonString] = useState<string>('');
  // const [selectedComponentsJson, setSelectedComponentsJson] = useState<object>({});

  useEffect(() => {
    const jsonString = JSON.stringify({
      selectedComponents: selectedComponents.map(comp => ({
        index: comp.toLowerCase(),
        name: comp,
        url: `/api/components/${comp.toLowerCase()}`
      }))
    });

    // setSelectedComponentsJsonString(jsonString);

    // Parse JSON string to object and set the state
    try {
      const parsedJson = JSON.parse(jsonString);
      // setSelectedComponentsJson(parsedJson);
      console.log(parsedJson);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }, [selectedComponents]);

  // -------------------------------------------------------------
  const classOptions = ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'];
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const handleToggle = (cls: string) => (selected: boolean) => {
    setSelectedClasses(prevSelectedClasses => {
      if (selected) {
        return [...prevSelectedClasses, cls];
      } else {
        return prevSelectedClasses.filter(c => c !== cls);
      }
    });
  };

  // const [selectedClassesJsonString, setSelectedClassesJsonString] = useState<string>('');
  // const [selectedClassesJson, setSelectedClassesJson] = useState<object>({});

  useEffect(() => {
    const jsonString = JSON.stringify({
      selectedClasses: selectedClasses.map(cls => ({
        index: cls.toLowerCase(),
        name: cls,
        url: `/api/classes/${cls.toLowerCase()}`
      }))
    });

    // setSelectedClassesJsonString(jsonString);

    // Parse JSON string to object and set the state
    try {
      const parsedJson = JSON.parse(jsonString);
      // setSelectedClassesJson(parsedJson);
      console.log(parsedJson);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }, [selectedClasses]);

  // -------------------------------------------------------------

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [showWarn, setShowWarn] = useState(false);
  // const [warnMessage, setWarnMessage] = useState('');

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

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    // setRedirectUrl(url);
    setTimeout(() => {
      goToSpells();
    }, 1000);
  };

  const showFailMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setShowConfirmation(false)
    }, 1000);
  };

  // const showInformationMessage = (message, url) => {
  //   setSuccessMessage(message);
  // };

  const handleSave = async () => {
    setLoading(true);
    const atackSaveCheck = ((attackSave == "---" || attackSave == "" || attackSave == "Select") || (saveThrow != ("" || "Select") || attackType != ("" || "Select")));
    const nameCheck = (name != "");
    const levelCheck = (!(level == "" || level == "Select"));
    const schoolCheck = (!(school == "" || school == "Select"));
    const castingTimeCheck = (!(castingTime == "" || castingTime == "Select"));
    const durationCheck = (!(duration == "" || duration == "Select"));
    const descCheck = (desc != "");

    if (atackSaveCheck && nameCheck && levelCheck && schoolCheck && castingTimeCheck && durationCheck && descCheck) {
      try {

        await postHomebrewSpellInfo(name, user[0].username, index, parseInt(level), schoolJson, duration, selectedClasses, castingTime, (range + " feet"), areaJson, selectedComponents, attackType, dcJson, damageJson, damage_at_slot_level, desc);
        setLoading(false);
        setSuccess(true);
        showSuccessMessage('Spell saved successfully!');

      } catch (error) {
        // Handle error if signup fails
        setLoading(false);
        setError(true);
        showFailMessage('Error while posting');
        setTimeout(() => {
          setError(false);
        }, 1500);

        console.log(error.toString().split(" || ")[1]);

      }
    }
    else {
      setLoading(false);
      setShowConfirmation(false);
      setShowWarn(true);
    }
  }

  const nopUrl = `/src/assets/nop.png`;
  if (!user || !user[0].isMaster) {
    return (
      <div className="text-center background-camp-image"

        style={{
          backgroundImage: `url(${nopUrl})`,
          color: 'white',
        }}>
        <h1 style={{ marginTop: "25%", filter: "drop-shadow(1px 1px 1px black) drop-shadow(-1px -1px 1px black)" }}>Please log in as Master to create homebrew spells.</h1>
      </div>
    );
  }


  // console.log(user[0].username)
  const spellUrl = `/src/assets/magic.jpg`;

  return (
    <div className='even-section'>

      <ul className="custom-list">
        <li>
          <BreadcrumbNav />
          <br />
          <div className="container">
            <h1 className="container titleText">Create Your Spell</h1>
          </div>
        </li>
      </ul>


      <ul className="custom-list">
        <li>
          <div className="container " style={{ overflow: "visible" }}>

            <div className="panel-body inf-content rounded p-5 spellBoard  background-camp-image-with-opacity"
              style={{
                backgroundImage: `url(${spellUrl})`,
                color: 'white',
                overflow: "visible"
              }}
            >
              <div className="row ">

                <div className="col-md-8">

                  <div className="table-responsive " style={{ overflow: "visible" }}>

                    <div className="container ">

                      <h5>New Spell Name:*</h5>
                      <DDoneTextInput
                        width="100%"
                        placeholder="Enter Spell Name"
                        value={name}
                        onChange={handleNameChange}
                      />

                      <br />

                      <div className="row">
                        <div className="col-md-3">
                          <strong>Level*</strong>
                          <DDoneDropdown
                            width="85px"
                            height="30px"
                            options={levelOptions}
                            value={level == '0' ? 'Cantrip' : level}
                            onChange={handleLevelChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <strong>Casting Time*</strong>
                          <DDoneDropdown
                            width="130px"
                            height="30px"
                            options={castingTimeOptions}
                            value={castingTime}
                            onChange={handleCastingTimeChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <strong>Range/Area</strong>
                          <div className="d-flex align-items-center">
                            <DDoneTextInput
                              width="80px"
                              placeholder="Range"
                              value={range}
                              onChange={handleRangeChange}
                              isNumber={true}
                            />
                            <span>feet</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <DDoneTextInput
                              width="80px"
                              placeholder="Area"
                              value={area}
                              onChange={handleAreaChange}
                              isNumber={true}
                            />
                            <span>feet</span>
                          </div>
                          <div className="my-1">
                            <DDoneDropdown
                              width="110px"
                              height="30px"
                              options={areaTypeOptions}
                              value={areaType == "" ? "---" : areaType}
                              onChange={handleAreaTypeChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <strong>Components</strong>
                          <DDoneCheckBox text="Verbal" onChange={handleComponents("V")} />
                          <DDoneCheckBox text="Somatic" onChange={handleComponents("S")} />
                          <DDoneCheckBox text="Material" onChange={handleComponents("M")} />
                        </div>
                      </div>

                      <br />

                      <div className="row">
                        <div className="col-md-3">
                          <strong>Duration*</strong>
                          <DDoneDropdown
                            width="140px"
                            height="30px"
                            options={durationOptions}
                            value={duration}
                            onChange={handleDurationChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <strong>School*</strong>
                          <DDoneDropdown
                            width="140px"
                            height="30px"
                            options={schoolOptions}
                            value={school}
                            onChange={handleSchoolChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <strong>Attack/Save</strong>
                          <DDoneDropdown
                            width="130px"
                            height="30px"
                            options={attackSaveOptions}
                            value={attackSave}
                            onChange={handleAttackSaveChange}
                          />
                          {isAttack && (
                            <>
                              <span>Attack Type:</span>
                              <DDoneDropdown
                                width="130px"
                                height="30px"
                                options={attackTypeOptions}
                                value={attackType}
                                onChange={handleAttackTypeChange}
                              />
                            </>
                          )}
                          {isSave && (
                            <>
                              <span>Save Throw:</span>
                              <DDoneDropdown
                                width="130px"
                                height="30px"
                                options={saveThrowOptions}
                                value={saveThrow == "" ? "Select" : saveThrow}
                                onChange={handleSaveThrowChange}
                              />
                            </>
                          )}
                        </div>
                        <div className="col-md-3">
                          <strong>Damage</strong>
                          <div className="row mx-1 d-flex align-items-center">
                            <DDoneTextInput
                              width="50px"
                              placeholder="nº"
                              value={diceAmount}
                              onChange={handleDiceAmountChange}
                              isNumber={true}
                            />
                            <DDoneDropdown
                              width="60px"
                              height="32px"
                              options={diceOptions}
                              value={dice}
                              onChange={handleDiceChange}
                            />
                          </div>
                          <strong>Damage Type</strong>
                          <div className="my-1">
                            <DDoneDropdown
                              width="120px"
                              height="30px"
                              options={damageTypeOptions}
                              value={damageType == "" ? "---" : damageType}
                              onChange={handleDamageTypeChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 noBackground">
                  <div className="rounded-circle img-container d-flex justify-content-center align-items-center" style={{ backgroundColor: "#0f0f0f", maxWidth: "300px", maxHeight: "300px" }}>
                    <img alt="Spell School" className="img-thumbnail img-fluid border-0" src={"/src/assets/spell-schools/" + schoolPic + ".png"} />
                  </div>
                </div>


                <section className="container">
                  <hr className="my-5 separator" style={{ borderWidth: "3px" }} />
                  <strong>Spell's Description*</strong>
                  <DDoneTextArea
                    width="100%"
                    height={10}
                    placeholder="Write your spell's Description"
                    value={desc}
                    onChange={handleDescChange}
                  />
                </section>



                <section className="container m-3 ">
                  <br />
                  <h6 className="titleText">Available for:* </h6>
                  <div className="row align-items-center justify-content-center">
                    {classOptions.map((cls) => (
                      <div key={cls} className="col-mx-2 d-flex align-items-center text-center custom-link" >
                        <div className="py-3 text-center">
                          <DDoneImageToggle
                            imageName={cls.toLowerCase()} // Provide the path to your image
                            label={cls}
                            isSelected={selectedClasses.includes(cls)}
                            onToggle={handleToggle(cls)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

              </div>


              <div className="row justify-content-center">
                <DDoneButton
                  width="100px"
                  height={2}
                  onClick={() => setShowConfirmation(true)}
                  text="Save"
                />
              </div>

            </div>

          </div>
        </li>
      </ul>
      {showConfirmation && (
        <ConfirmationPopUp
          message="Are you sure you want to save this spell?"
          onConfirm={handleConfirmSave}
          onCancel={handleCancelSave}
        />
      )}
      {isLoading && (
        <DDoneLoading
          isLoading={isLoading}
          isOK={isSuccess}
          isFail={isError}
          message={isLoading ? 'Saving...' : (isSuccess ? successMessage : 'Failed to save')}
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


    </div >
  );
}
