
Feature('awww');

Scenario('Should show results of Awww posts', (I) => {
	I.amOnPage('/')
	I.waitForText("RedditGrabber");
	I.fillField("subreddit", "aww");
	I.pressKey('Enter');
	I.waitForInvisible("//h2[text()='No subreddit posts found :(']");
	I.dontSee("No subreddit posts found :(");
	I.seeElement('.Posts');
});
