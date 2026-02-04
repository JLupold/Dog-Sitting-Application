"use strict";

const DogInsertOrUpdate = (props) => {

    let action = "insert";
    let id = "";
    const url = props.location.pathname;
    console.log("URL that invoked DogInsertOrUpdate: " + url);

    const parts = url.split("/");
    if (parts.length > 2 && parts[2] !== "") {
        id = parts[parts.length - 1];
        console.log("Updating dog with ID " + id);
        action = "update";
    } else {
        console.log("Inserting new dog record");
    }

    const [dogData, setDogData] = React.useState({
        dogID: "",
        dogTag: "",
        dogName: "",
        dogBreed: "",
        medicalConcerns: "",
        behavioralConcerns: "",
        dateofDropoff: "",
        dateofPickup: "",
        imageURL: "",
        webUserID: "",
        userEmail: "",
        errorMsg: ""
    });

    const [ownerList, setOwnerList] = React.useState([]);
    const [errorObj, setErrorObj] = React.useState({ ...dogData });
    const [isLoading, setIsLoading] = React.useState(true);

    const setProp = (obj, propName, propValue) => {
        let copy = Object.assign({}, obj);
        copy[propName] = propValue;
        return copy;
    };

    const encodeDogInput = () => {
        const dogInputObj = { ...dogData };
        return encodeURI(JSON.stringify(dogInputObj));
    };

    React.useEffect(() => {
        console.log("Fetching owner list...");

        ajax_alt("webUser/getAll",
            (obj) => {
                if (obj.dbError && obj.dbError.length > 0) {
                    setErrorObj(setProp(errorObj, "webUserID", obj.dbError));
                } else {
                    obj.webUserList.sort((a, b) => a.userEmail.localeCompare(b.userEmail));
                    setOwnerList(obj.webUserList);

                    if (obj.webUserList.length > 0) {
                        setDogData(setProp(dogData, "webUserID", obj.webUserList[0].webUserId));
                    }

                    if (action === "update") {
                        console.log("Fetching dog record with ID " + id);

                        ajax_alt("dog_info/getById?dogID=" + id,
                            (obj) => {
                                if (obj.errorMsg && obj.errorMsg.length > 0) {
                                    setErrorObj(setProp(errorObj, "errorMsg", obj.errorMsg));
                                } else {
                                    setDogData(obj);
                                }
                            },
                            (ajaxErrorMsg) => {
                                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                            }
                        );
                    }
                }
                setIsLoading(false);
            },
            (ajaxErrorMsg) => {
                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                setIsLoading(false);
            }
        );
    }, []);

    const validate = () => {
        console.log("Saving dog data...");
        console.log(dogData);

        setIsLoading(true);

        ajax_alt("dog_info/" + action + "?jsonData=" + encodeDogInput(),
            (obj) => {
                if (obj.errorMsg.length === 0) {
                    obj.errorMsg = "Record Saved!";
                }
                setErrorObj(obj);
                setIsLoading(false);
            },
            (ajaxErrorMsg) => {
                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                setIsLoading(false);
            }
        );
    };

    if (isLoading) return <div>... Loading ...</div>;

    return (
        <table className="insertArea">
            <tbody>
                <tr>
                    <td>Dog ID</td>
                    <td><input value={dogData.dogID} disabled /></td>
                    <td className="error">{errorObj.dogID}</td>
                </tr>

                <tr>
                    <td>Dog Tag</td>
                    <td>
                        <input value={dogData.dogTag}
                            onChange={(e) => setDogData(setProp(dogData, "dogTag", e.target.value))} />
                    </td>
                    <td className="error">{errorObj.dogTag}</td>
                </tr>

                <tr>
                    <td>Dog Name</td>
                    <td>
                        <input value={dogData.dogName}
                            onChange={(e) => setDogData(setProp(dogData, "dogName", e.target.value))} />
                    </td>
                    <td className="error">{errorObj.dogName}</td>
                </tr>

                <tr>
                    <td>Breed</td>
                    <td>
                        <input value={dogData.dogBreed}
                            onChange={(e) => setDogData(setProp(dogData, "dogBreed", e.target.value))} />
                    </td>
                    <td className="error">{errorObj.dogBreed}</td>
                </tr>

                <tr>
                    <td>Medical Concerns</td>
                    <td>
                        <input value={dogData.medicalConcerns}
                            onChange={(e) => setDogData(setProp(dogData, "medicalConcerns", e.target.value))} />
                    </td>
                    <td className="error">{errorObj.medicalConcerns}</td>
                </tr>

                <tr>
                    <td>Behavioral Concerns</td>
                    <td>
                        <input value={dogData.behavioralConcerns}
                            onChange={(e) => setDogData(setProp(dogData, "behavioralConcerns", e.target.value))} />
                    </td>
                    <td className="error">{errorObj.behavioralConcerns}</td>
                </tr>

                <tr>
                    <td>Date of Dropoff</td>
                    <td>
                        <input value={dogData.dateofDropoff}
                            onChange={(e) => setDogData(setProp(dogData, "dateofDropoff", e.target.value))} />
                    </td>
                    <td className="error">{errorObj.dateofDropoff}</td>
                </tr>

                <tr>
                    <td>Date of Pickup</td>
                    <td>
                        <input value={dogData.dateofPickup}
                            onChange={(e) => setDogData(setProp(dogData, "dateofPickup", e.target.value))} />
                    </td>
                    <td className="error">{errorObj.dateofPickup}</td>
                </tr>

                <tr>
                    <td>Image URL</td>
                    <td>
                        <input value={dogData.imageURL}
                            onChange={(e) => setDogData(setProp(dogData, "imageURL", e.target.value))} />
                    </td>
                    <td className="error">{errorObj.imageURL}</td>
                </tr>

                <tr>
                    <td>Owner</td>
                    <td>
                        <select
                            value={dogData.webUserID}
                            onChange={(e) => setDogData(setProp(dogData, "webUserID", e.target.value))}
                        >
                            {ownerList.map((owner) => (
                                <option key={owner.webUserId} value={owner.webUserId}>
                                    {owner.webUserId} - {owner.userEmail}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className="error">{errorObj.webUserID}</td>
                </tr>

                <tr>
                    <td>
                        <br />
                        <button type="button" onClick={validate}>Save</button>
                    </td>
                    <td className="error" colSpan="2">
                        <br />
                        {errorObj.errorMsg}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};