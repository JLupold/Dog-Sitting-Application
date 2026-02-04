"use strict";

const MakeShowData = (config) => {

  return () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbList, setDbList] = React.useState([]);
    const [filteredList, setFilteredList] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [filterInput, setFilterInput] = React.useState("");

    React.useEffect(() => {
      ajax_alt(
        config.url,
        (obj) => {
          if (obj.dbError && obj.dbError.length > 0) {
            setError(obj.dbError);
          } else {
            const data = obj.webUserList || obj.dogList || obj.dataList || [];
            setDbList(data);
            setFilteredList(data);
          }
          setIsLoading(false);
        },
        (msg) => {
          setError(msg);
          setIsLoading(false);
        }
      );
    }, []);

    const doDelete = (id) => {

      if (!confirm("Are you sure you want to delete this record?")) return;

      let deleteUrl = "";

      if (config.url.includes("webUser")) {
        deleteUrl = "webUser/delete?userId=" + id;
      } else if (config.url.includes("dog_info")) {
        deleteUrl = "dog_info/delete?dogId=" + id;
      }

      ajax_alt(
        deleteUrl,
        (obj) => {
          if (obj.errorMsg && obj.errorMsg.length > 0) {
            alert(obj.errorMsg);
          } else {
            // refresh list after successful delete
            const newList = dbList.filter(item => item[config.keyProp] !== id);
            setDbList(newList);
            setFilteredList(newList);
          }
        },
        (msg) => {
          alert(msg);
        }
      );
    };

    // Filtering
    const doFilter = () => {
      setFilteredList(filterObjList(dbList, filterInput));
    };

    const clearFilter = () => {
      setFilterInput("");
      setFilteredList(dbList);
    };

    // Sorting
    const sortByProp = (name, type) => {
      jsSort(filteredList, name, type);
      setFilteredList([...filteredList]);
    };

    const callInsert = () => {
      if (config.url.includes("webUser")) {
        window.location.hash = "#/userInsert";
      } else if (config.url.includes("dog_info")) {
        window.location.hash = "#/dogInsert";
      }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="clickSort">

        <h3>
          {config.title}&nbsp;
          <img
            src="icons/insert.png"
            onClick={callInsert}
            title="Insert new record"
            style={{ cursor: "pointer", width: "20px" }}
          />
          &nbsp;
          <input
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            placeholder="Filter..."
          />
          &nbsp;
          <button onClick={doFilter}>Search</button>
          &nbsp;
          <button onClick={clearFilter}>Clear</button>
        </h3>

        <table>
          <thead>
            <tr>

              <th>Edit</th>
              <th>Delete</th>

              {config.columns.map(col => (
                col.type !== "edit" &&
                <th
                  key={col.name}
                  onClick={() => sortByProp(col.name, col.type)}
                  className={col.type === "number" ? "textAlignRight" : ""}
                >
                  <span>
                    <img src="icons/blackSortDown.png" /> {col.label}
                  </span>
                </th>
              ))}

              <th>Error</th>
            </tr>
          </thead>

          <tbody>
            {filteredList.map(obj => (
              <tr key={obj[config.keyProp]}>

                <td className="textAlignCenter">
                  <a
                    href={
                      config.url.includes("webUser")
                        ? `#/userUpdate/:${obj[config.keyProp]}`
                        : config.url.includes("dog_info")
                          ? `#/dogUpdate/${obj[config.keyProp]}`
                          : "#"
                    }
                  >
                    <img src="icons/update.png" className="clickLink" />
                  </a>
                </td>

                <td className="textAlignCenter">
                  <img
                    src="icons/delete.png"
                    className="clickLink"
                    onClick={() => doDelete(obj[config.keyProp])}
                  />
                </td>

                {config.columns.map(col => (
                  col.type !== "edit" &&
                  <td
                    key={col.name}
                    className={
                      col.type === "number" ? "textAlignRight"
                        : col.type === "image" ? "textAlignCenter shadowImage"
                          : ""
                    }
                  >
                    {col.type === "image"
                      ? <img src={obj[col.name]} />
                      : obj[col.name]
                    }
                  </td>
                ))}

                <td>{obj.errorMsg}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    );
  };
};