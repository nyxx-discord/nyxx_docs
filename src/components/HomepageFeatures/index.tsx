import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import NyxxSvg from '@site/static/img/Nyxx_Logo.svg';
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
  {
    title: 'You can use it in your project',
    Svg: NyxxSvg,
    description: (
      <>
        Nyxx is open source and can be used in your project.
      </>
    ),
  },
  {
    title: "It's easy to use",
    Svg: NyxxSvg,
    description: (
      <>
        Nyxx is easy to use and you can use it in your project.
      </>
    ),
  },
];

const FeatureItem = ({ title, Svg, description }: FeatureItem) => (
  <div className={styles.featureItem}>
    <Svg className={styles.featureItemIcon} />
    <div className={styles.featureItemTitle}>{title}</div>
    <div className={styles.featureItemDescription}>{description}</div>
  </div>
);

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
