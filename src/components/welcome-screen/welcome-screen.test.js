import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-sreen.jsx";

it(`I text welcome screen wati whant`, () => {
  const tree = renderer
    .create(
        <WelcomeScreen
          errorsCount={3}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
