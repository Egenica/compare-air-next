# Front-end Engineering: Practical assessment

## Setup

To get started, install the dependencies with `npm install`.

Run the application with `npm run dev`.

Launch application in browser at [http://localhost:3000](http://localhost:3000).

## Task Description

Candidates are asked to build a simple single page solution using frameworks of their choice that demonstrate their skill as a front-end engineer. The webpage will be based on existing functionality on our website and static hosted versions of the APIs are provided which you will need to consume to get the data.

The solution should represent your own design inspiration and should not follow brand guidelines. We are looking for creativity, clean, testable and reusable code. Feel free to use whichever front-end and CSS frameworks you wish but be prepared to discuss your choices. Both the working website and the source code will be evaluated together along with the presentation.

For awareness, we use both React and NextJS as our main front-end frameworks written in Typescript.

## Scenario

You have been tasked with building a web page that allows a user to select between two investment strategies. One strategy has 3 fund options, the other has only a single fund option. Users should be able to select between either strategy and then select an individual fund. Once the fund is selected, you will need to display the information provided on the API links below. Each fund has its own hosted JSON file.

Please follow your own design and layout.

As an aid, the following data points typically follow a convention:

- analystRating, is displayed as a star rating between 0-5.
- SRRI, is a sliding measure of risk between 0-10 where 10 zero is low risk, 10 is very high risk.
- Portfolio.asset is traditionally displayed as a pie chart, where the values are percentages.

You may refer to this page as a reference for similar functionality [(https://www.ajbell.co.uk/investment-ideas/ajbell-funds)]

## APIs

Growth Funds Variations

- Cautious BYW8RV9 [https://cdn.core3-dev.ajbbuild.uk/interview/BYW8RV9.json]
- Balanced BYW8RX1 [https://cdn.core3-dev.ajbbuild.uk/interview/BYW8RX1.json]
- Adventurous BYW8VG2 [https://cdn.core3-dev.ajbbuild.uk/interview/BYW8VG2.json]

Responsible Growth Fund

- Responsible BN0S2V9 [https://cdn.core3-dev.ajbbuild.uk/interview/BN0S2V9.json]

Display what you can about each selected Fund using the data returned in the API in a visually appealing way.

## Lighthouse Audit Result

![Lighthouse Result](/SCR-20240905-olzn.png)
