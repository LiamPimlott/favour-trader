import React, { Component } from 'react';
import { FlatList, StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import AuthService from "../components/AuthService";
import { Button, CheckBox, Divider, List, ListItem, Text } from "react-native-elements";
import axios from 'axios';

export default class TradeOverview extends React.Component {
	constructor() {
		super();
		this.state = {
			skillListOfferee: [],
			skillListOfferor: [],
			isOfferor: false,
			offerorRequestTermination: false,
			offereeRequestTermination: false,
			contractModified: false,
			contractIsCompletable: false,
		};
		this.authService = new AuthService();
	}

	componentDidMount() {
		this.mounted = true;
		this.mapSkillsToTrade();
		this.setUserRole();
		this.setTradeState();
		this.setTradeCompletable();
	}

	mapSkillsToTrade() {
		// Trades do not store the names of the skills, only the _id values (therefore need to map)
		const trade = this.props.navigation.state.params.trade;
		this.getSkills(trade.offeree.favours, true);
		this.getSkills(trade.offeror.favours, false);
	}

	setTradeCompletable = () => {
		let isCompletable = true;
		const trade = this.props.navigation.state.params.trade;
		const offerorFavours = trade.offeror.favours;
		const offereeFavours = trade.offeree.favours;

		offerorFavours.forEach(favour => {
			if (!favour.completed) {
				isCompletable = false;
			}
		})

		offereeFavours.forEach(favour => {
			if (!favour.completed) {
				isCompletable = false;
			}
		})

		this.setState({
			contractIsCompletable: isCompletable,
		});
	}

	setTradeState() {
		const trade = this.props.navigation.state.params.trade;

		if (trade.offeror.requestTermination) {
			this.setState({
				offerorRequestTermination: true,
			});
		}

		if (trade.offeree.requestTermination) {
			this.setState({
				offereeRequestTermination: true,
			});
		}
	}

	setUserRole() {
		const trade = this.props.navigation.state.params.trade;
		const userId = this.props.navigation.state.params.userId;
		const isOfferor = trade.offeror.id === userId;
		this.setState({
			isOfferor
		});
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	renderList(list) {
		const trade = this.props.navigation.state.params.trade;
		if (trade.status === 'Accepted') {
			return (
				list.map((item, i) => (
					<CheckBox
						title={item.skillId.skill}
						key={i}
						checked={this.checkFavourStatus(item)}
						onPress={() => this.markAsComplete(item)}
					/>
				))
			);
		} else {
			return (
				list.map((item, i) => (
					<ListItem
						title={item.skillId.skill}
						key={i}
						hideChevron={true}
					/>
				))
			);
		}

	}

	markAsComplete(skill) {
		const { skillListOfferee, skillListOfferor } = this.state;
		if (!this.state.contractModified) {
			this.setState({
				contractModified: true,
			});
		}
		if (this.state.isOfferor) {
			const updatedUserFavours = skillListOfferor.map(favour => {
				const updatedFavour = { ...favour };
				if (updatedFavour._id === skill._id) {
					updatedFavour.completed = !skill.completed
				}
				return updatedFavour;
			});
			this.setState({
				skillListOfferor: updatedUserFavours,
			});
		} else {
			const updatedUserFavours = skillListOfferee.map(favour => {
				const updatedFavour = { ...favour };
				if (updatedFavour._id === skill._id) {
					updatedFavour.completed = !skill.completed
				}
				return updatedFavour;
			});
			this.setState({
				skillListOfferee: updatedUserFavours,
			});
		}
	}

	saveUpdatedFavours = () => {
		const { navigate } = this.props.navigation;
		const trade = this.props.navigation.state.params.trade;
		const tradeId = trade._id;
		const userRole = this.state.isOfferor ? 'offeror' : 'offeree';
		const updatedFavours = this.state.isOfferor ? (this.state.skillListOfferor) : (this.state.skillListOfferee)
		const endpoint = `http://favour-trader.appspot.com/api/contracts/${tradeId}/${userRole}/favours`;

		this.authService.getToken()
			.then(token => {
				const headers = {
					Authorization: token,
				};
				const body = {
					'updatedFavours': updatedFavours,
				};
				axios({
					method: 'put',
					headers: headers,
					url: endpoint,
					data: body
				})
					.then(navigate('Trades'))
					.catch((err) => {
						console.log(err);
					});
			})
	}

	checkFavourStatus(skill) {
		const { skillListOfferee, skillListOfferor } = this.state;
		const offereeIndex = skillListOfferee.indexOf(skill);
		const offerorIndex = skillListOfferor.indexOf(skill);
		
		if (offereeIndex === -1 && offerorIndex === -1) {
			return -1;
		} else if (offereeIndex !== -1) {
			return (skillListOfferee[offereeIndex].completed === true);
		} else {
			return (skillListOfferor[offerorIndex].completed === true);
		}
	}

	getSkills(mySkills, isOfferee) {
		const endpoint = 'http://favour-trader.appspot.com/api/skills/all';
		const config = {
			headers: {
				Authorization: this.authService.getToken()
			},
		};
		let userSkills = [];
		axios.get(endpoint, config)
			.then(res => res.data)
			.then(skills => {
				if (this.mounted) {
					for (let i = 0; i < mySkills.length; i++) {
						for (let j = 0; j < skills.length; j++) {
							if (mySkills[i].skillId == skills[j]._id) {
								userSkills.push({
									skillId: {
										_id: skills[j]._id,
										skill: skills[j].skill,
										__v: skills[j].__v,
									},
									completed: mySkills[i].completed,
									description: mySkills[i].description,
									_id: mySkills[i]._id,
								});
							}
						}
					}
					if (isOfferee) {
						this.setState({ skillListOfferee: userSkills, });
					}
					else {
						this.setState({ skillListOfferor: userSkills, });
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	requestTermination = () => {
		const { isUserOfferor } = this.state;
		const { navigate } = this.props.navigation;
		const trade = this.props.navigation.state.params.trade;
		const userRole = this.state.isOfferor ? 'offeror' : 'offeree';
		const tradeId = trade._id;
		const endpoint = `http://favour-trader.appspot.com/api/contracts/${tradeId}/terminate`;

		this.authService.getToken()
			.then(token => {
				const headers = {
					Authorization: token,
				};
				axios({
					method: 'put',
					headers: headers,
					url: endpoint,
				})
					.then(() => navigate('Trades'))
					.catch((err) => {
						console.log(err);
					});
			})
	}

	acceptTrade = () => {
		const { navigate } = this.props.navigation;
		const trade = this.props.navigation.state.params.trade;
		this.authService.getToken()
			.then(token => {
				const headers = {
					Authorization: token,
				};
				const endpoint = `http://favour-trader.appspot.com/api/contracts/${trade._id}/status`;
				const body = { status: "Accepted" };
				axios({
					method: 'put',
					headers: headers,
					url: endpoint,
					data: body,
				})
					.then(() => navigate('Trades'))
					.catch((err) => {
						console.log(err);
					});
			})
	}

	declineTrade = () => {
		const { navigate } = this.props.navigation;
		const trade = this.props.navigation.state.params.trade;
		this.authService.getToken()
			.then(token => {
				const headers = {
					Authorization: token,
				};
				const endpoint = `http://favour-trader.appspot.com/api/contracts/${trade._id}/status`;
				const body = { status: "Declined" };
				axios({
					method: 'put',
					headers: headers,
					url: endpoint,
					data: body,
				})
					.then(() => navigate('Trades'))
					.catch((err) => {
						console.log(err);
					});
			})
	}

	resetFavours = () => {
		const trade = this.props.navigation.state.params.trade;
		this.getSkills(trade.offeree.favours, true);
		this.getSkills(trade.offeror.favours, false);
		this.setState({
			contractModified: false,
		});
	}

	renderButtons() {
		const { navigate } = this.props.navigation;
		const trade = this.props.navigation.state.params.trade;
		if (trade.status === 'Completed' || trade.status === 'Declined' || trade.status === 'Terminated') {
			return (
				<View>
					<Text>This trade has been {trade.status}.</Text>
					<Button
						title={'Return to Trades'}
						onPress={() => navigate('Trades')}
					/>
				</View>
			);
		}

		if (this.state.offerorRequestTermination || this.state.offereeRequestTermination) {
			if (this.state.isOfferor && this.state.offerorRequestTermination
				|| !this.state.isOfferor && this.state.offereeRequestTermination) {
				return (
					<View>
						<Text>You have a requested to {this.state.contractIsCompletable ? 'complete' : 'terminate'} this trade.</Text>
						<Text>Awaiting Response</Text>
						<Button
							title={'Return to Trades'}
							onPress={() => navigate('Trades')}
						/>
					</View>
				);
			} else {
				const userName = this.state.isOfferor ? trade.offeree.name.first : trade.offeror.name.first;
				return (
					<View>
						<Text>{`${userName} has requested to ${this.state.contractIsCompletable ? 'complete' : 'terminate'} this trade.`}</Text>
						<Button
							title={'Confirm Termination'}
							onPress={this.requestTermination}
						/>
					</View>
				)
			}
		}

		if (trade.status === 'Accepted') {
			if (this.state.contractModified) {
				return (
					<View style={styles.buttonContainer}>
						<Button
							title={'Save Changes'}
							onPress={this.saveUpdatedFavours}
						/>
						<Button style={styles.stackedButton}
							title={'Reset Changes'}
							onPress={this.resetFavours}
						/>
					</View>
				);
			} else if (this.state.contractIsCompletable) {
				return (
					<View>
						<Button
							title={'Confirm Trade Completion'}
							onPress={this.requestTermination}
						/>
					</View>
				);
			} else {
				return (
					<View style={styles.buttonContainer}>
						<Button
							title={'Request to Terminate Trade'}
							onPress={this.requestTermination}
						/>
					</View >
				)
			}
		}

		// Otherwise the trade is pending
		if (this.state.isOfferor) {
			return (
				<View>
					<Text>{`Awaiting ${trade.offeree.name.first}'s response.`}</Text>
					<Button
						title={'Return to Trades'}
						onPress={() => navigate('Trades')}
					/>
				</View>
			);
		} else { // User is the trade offeree
			return (
				<View style={styles.buttonContainer}>
					<Button
						title={'Accept Trade'}
						onPress={this.acceptTrade}
					/>
					< Button style={styles.stackedButton}
						title={'Decline Trade'}
						onPress={this.declineTrade}
					/>
				</View >
			);
		}
	}

	render() {
		if (this.mounted) {
			const trade = this.props.navigation.state.params.trade;
			return (
				<ScrollView >
					<Text h3>{trade.offeree.name.first} {trade.offeree.name.last}</Text>
					<View >
						<List >
							{this.renderList(this.state.skillListOfferee)}
						</List>
					</View>
					<View >
						<Text h3>{trade.offeror.name.first} {trade.offeror.name.last}</Text>
						<List >
							{this.renderList(this.state.skillListOfferor)}
						</List>
					</View>
					<Text style={{ fontWeight: 'bold' }}>Messages: {trade.messages}</Text>
					<Divider />
					{this.renderButtons()}
				</ScrollView>
			);
		}
		return (
			<View>
				<Text>Looks like something went wrong, please try again later!</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		paddingTop: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	stackedButton: {
		paddingTop: 10,
		marginTop: 10,
	},
});
