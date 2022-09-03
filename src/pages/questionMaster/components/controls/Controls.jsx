import React, { useRef, useState } from "react";
import classes from "./Controls.module.scss";
import Input from "../../../../components/input/Input";
import { CloseCircleOutlined } from "@ant-design/icons";

const Controls = ({ setFilters, hasFilters }) => {
  const debounceRef = useRef(0);
  const [inputKey, setInputKey] = useState(0);
  const debounce = (action) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(action, 450);
  };

  const setWithDebounce = (event, propertyName) => {
    const newValue = {};
    newValue[propertyName] = event.target.value;
    debounce(() =>
      setFilters((prevState) => ({
        ...prevState,
        ...newValue,
      }))
    );
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.controls}>
        <header className={classes.header}>
          <section className={classes.titles}>
            <h2 className={classes.title}>Control results</h2>
            <h3 className={classes.subtitle}>
              Find the perfect problem using these filters
            </h3>
          </section>
          {hasFilters ? (
            <CloseCircleOutlined
              className={classes.clearAll}
              onClick={() => {
                setFilters({});
                setInputKey((prevState) => prevState + 1);
              }}
            />
          ) : null}
        </header>
        <section className={classes.inputs}>
          <Input
            key={`${inputKey}search`}
            onChange={(e) => {
              setWithDebounce(e, "search");
            }}
            label={"Search"}
            placeholder={"Insert a term here"}
          />
          <Input
            key={`${inputKey}views`}
            onChange={(e) => setWithDebounce(e, "views")}
            className={classes.views}
            label={"Minimum number of views"}
            placeholder={"0"}
            type={"number"}
          />
          <div className={classes.atom}>
            <p className={classes.label}>Number of solutions</p>
            <div className={classes.row}>
              <Input
                key={`${inputKey}minSolutions`}
                onChange={(e) => setWithDebounce(e, "minSolutions")}
                label={"Min"}
                placeholder={"0"}
                type={"number"}
              />
              <Input
                key={`${inputKey}maxSolutions`}
                onChange={(e) => setWithDebounce(e, "maxSolutions")}
                label={"Max"}
                placeholder={"Infinity"}
                type={"number"}
              />
            </div>
          </div>
          <div className={classes.atom}>
            <p className={classes.label}>
              Number of users working on the solution
            </p>
            <div className={classes.row}>
              <Input
                key={`${inputKey}minDevs`}
                onChange={(e) => setWithDebounce(e, "minDevs")}
                label={"Min"}
                placeholder={"0"}
                type={"number"}
              />
              <Input
                key={`${inputKey}maxDevs`}
                onChange={(e) => setWithDebounce(e, "maxDevs")}
                label={"Max"}
                placeholder={"Infinity"}
                type={"number"}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Controls;
