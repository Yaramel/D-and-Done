/* eslint-disable @typescript-eslint/no-explicit-any */
import BreadcrumbNav from "../../assetsForDesign/BreabcrumbNav";

interface inputs {

    ruleData: any;

}


export default function RuleInfoBoard({ ruleData }: inputs) {

    return (
        <div className="even-section">

            <BreadcrumbNav />
            <br />

            <div className="container">

                <h1 className="container titleText">{ruleData.name}</h1>
                <section className="container">
                    <div >
                        <strong>{ruleData.author ? `Homebrew by '${ruleData.author}'` : ''}</strong>
                    </div>
                </section>
                <br />

                <div className="panel-body inf-content rounded p-1 ruleBoard">
                    <div className="row ">
                        <div className="col-md-8">
                            <div className="table-responsive ">


                                <hr className="my-5 separator" style={{ borderWidth: "3px" }} />

                                <section className="container">
                                    <div >
                                        {ruleData.desc.replaceAll("*", "").replaceAll("#", "")}
                                    </div>
                                </section>
                                <br />
                            </div>
                        </div>
                        {/* <div className="col-md-4 noBackground">
                            <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ backgroundColor: "#0f0f0f", width: "300px" }}>
                                <img alt="" style={{ width: "300px" }} title="" className="img-thumbnail border-0" src={"/src/assets/rule-schools/" + ruleData.school.index + ".png"} ruleData-original-title="RuleSchoolImage" />
                            </div>
                        </div> */}



                    </div>
                </div>
            </div>
        </div>

    );
}