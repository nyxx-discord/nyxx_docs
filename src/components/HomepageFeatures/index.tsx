import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import NyxxSvg from '@site/static/img/Nyxx_Banner.svg';
import DartSvg from '@site/static/img/Dart_Logo.svg';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    // https://dart.dev/brand
    title: 'Powered by Dart\u2122',
    Svg: DartSvg,
    description: (
      <>
        Nyxx uses Dart, a fast and modern language by Google used by millions.
      </>
    ),
  },
  {
    title: "Simple & easy to use",
    Svg: NyxxSvg,
    description: <>Nyxx is designed with ease of use in mind and exposes powerful APIs built in to the library.</>,
  },
  {
    title: 'Open source',
    Svg: NyxxSvg,
    description: (
      <>
        Nyxx is{' '}
        <a
          href="https://github.com/nyxx-discord/nyxx"
          target="_blank"
          rel="noopener noreferrer"
        >
          open source
        </a>{' '}
        and can be used for projects of any size, for free.
      </>
    ),
  },
];

const FeatureItem: (items: FeatureItem) => React.ReactElement<FeatureItem> = ({
  title,
  Svg,
  description,
}) => (
  <div className={styles.featureItem}>
    <Svg className={styles.featureItemIcon} />
    <div className={styles.featureItemTitle}>{title}</div>
    <div className={styles.featureItemDescription}>{description}</div>
  </div>
);

function Feature({ title, Svg, description }: FeatureItem): JSX.Element {
  return (
    <div className={clsx('col col--4')}>
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
