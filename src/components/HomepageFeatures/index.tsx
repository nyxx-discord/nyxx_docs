import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import ReactSvg from "@site/static/img/undraw_docusaurus_react.svg";
import DartSvg from "@site/static/img/dart_logo.svg";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

// Willl fill this in later
const FeatureList: FeatureItem[] = [
  {
    title: "The power of Dart",
    Svg: DartSvg,
    description: (
      <>
        Nyxx is a Dart library that provides a way to easily interact with the
        Discord API.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
