import React, {Component} from 'react';
import TradeOverview from '../components/TradeOverview.js';
import TradeFavours from '../components/TradeFavours.js';
import axios from 'axios'
import {Row, Col, Button, Spin} from 'antd';

const OFFEROR = 'offeror';
const OFFEREE = 'offeree';

class Contract extends Component {
    constructor() {
        super();
        this.state = { 
            overview: {
                offereeName: '',
                offererName: '',
                tradeStatus: '',
                tradeMessage: '',
            },
            status: '',
            messages: [],
            offeror: {
                id: '',
                firstName: '',
                lastName: '',
                requestTermination: false,

            },
            offeree: {
                id: '',
                firstName: '',
                lastName: '',
                requestTermination: false,

            },
            favours: {
                offeror: [],
                offeree: [],
            },
            userUpdatedFavours: [],
            currentUserId: '',
            isUserOfferor: false,
            favoursEdited: false,
            saveFavoursWaiting: false,
            pageLoaded: false,
        };
    }

    toggleFavourCompleted = (favourId) => {
        const { authService } = this.props;
        const { userUpdatedFavours, isUserOfferor } = this.state;
        if (authService.loggedIn()) {
            const userFavourSet = isUserOfferor ? OFFEROR : OFFEREE;
            const updatedUserFavours = userUpdatedFavours.map( favour => {
                const updatedFavour = {...favour};
                updatedFavour.completed = (
                    favour._id === favourId ? !favour.completed : favour.completed 
                );
                return updatedFavour;
            });
            this.setState({
                userUpdatedFavours: updatedUserFavours,
                favoursEdited: true,
            });
        }
    }

    saveEditedFavours = () => {
        const { authService, match: { params } } = this.props;
        const { isUserOfferor, userUpdatedFavours, favours } = this.state;
        if (authService.loggedIn()) {
            const headers = {
                    Authorization: authService.getToken(),
            };
            const body = {
                updatedFavours: [
                    ...userUpdatedFavours
                ],
            };
            const base = window.location.origin;
            const tradeId = this.props.match.params.tradeID;
            const userRole = isUserOfferor ? OFFEROR : OFFEREE;
            const endpoint = `api/contracts/${tradeId}/${userRole}/favours`;
            this.setState({ saveFavoursWaiting: true });
            axios({
                method: 'put',
                headers: headers,
                baseURL: base,
                url: endpoint,
                data: body
            })
            .then(res => res.data.favours)
            .then(updatedFavours => {
                this.setState({
                    favours: updatedFavours,
                    saveFavoursWaiting: false, 
                    favoursEdited: false,
                });
            })
            .catch((err) => {
                this.setState({
                    userUpdatedFavours: favours[userRole],
                    saveFavoursWaiting: false, 
                    favoursEdited: false 
                })
                console.log(err);
            });
        }
    }

    cancelEditedFavours = () => {
        const { authService, match: { params } } = this.props;
        const { isUserOfferor, favours } = this.state;
        if (authService.loggedIn()) {
            const userRole = isUserOfferor ? OFFEROR : OFFEREE;
            this.setState({ 
                userUpdatedFavours: favours[userRole],
                favoursEdited: false,
            });
        }
    }

    componentWillMount(){
        const { authService } = this.props;
        const { match: { params } } = this.props;

        if (authService.loggedIn()) {
            const config = {
                headers: {
                    Authorization: authService.getToken()
                }
            };
            axios.get(`/api/contracts/contract/${params.tradeID}`, config)
                .then(res => res.data.trade)
                .then((tradeData) => {
                    const currentUserId = authService.getProfile().id;
                    const isUserOfferor = (currentUserId === tradeData.offeror.id);
                    this.setState({
                        overview: {
                            offererName: tradeData.offeror.name.first + ' ' + tradeData.offeror.name.last,
                            offereeName: tradeData.offeree.name.first + ' ' + tradeData.offeree.name.last,
                            tradeStatus: tradeData.status,
                            tradeMessage: tradeData.messages[0],
                        },
                        status: tradeData.status,
                        messages: tradeData.messages,
                        offeror: {
                            id: tradeData.offeror.id,
                            firstName: tradeData.offeror.name.first,
                            lastName: tradeData.offeror.name.last,
                            requestTermination: tradeData.offeror.requestTermination,
                        },
                        offeree: {
                            id: tradeData.offeree.id,
                            firstName: tradeData.offeree.name.first,
                            lastName: tradeData.offeree.name.last,
                            requestTermination: tradeData.offeree.requestTermination,
                        },
                        favours: {
                            offeror: tradeData.offeror.favours,
                            offeree: tradeData.offeree.favours,
                        },
                        userUpdatedFavours: (isUserOfferor ? tradeData.offeror.favours : tradeData.offeree.favours),
                        currentUserId: currentUserId,
                        isUserOfferor: isUserOfferor,
                        pageLoaded: true,
                    }) 
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        const {
            status, favours, offeror,
            offeree, currentUserId, isUserOfferor,
            favoursEdited, saveFavoursWaiting, userUpdatedFavours,
            pageLoaded,
        } = this.state;

        return pageLoaded ?
            (
                <div >
                    <Row>
                        <TradeOverview overview={this.state.overview} />
                    </Row>
                    <Row>
                        <TradeFavours
                            status={status}
                            offeror={offeror}
                            offeree={offeree}
                            isUserOfferor={isUserOfferor}
                            favoursEdited={favoursEdited}
                            saveFavoursWaiting={saveFavoursWaiting}
                            favours={favours}
                            userUpdatedFavours={userUpdatedFavours}
                            toggleFavourCompleted={this.toggleFavourCompleted}
                            saveEditedFavours={this.saveEditedFavours}
                            cancelEditedFavours={this.cancelEditedFavours}
                        />
                    </Row>
                    { this.state.status === "Pending" && !this.state.isUserOfferor 
                        ? (
                            <Row>
                                <Col span={12}  style={{textAlign: 'center'}}>
                                    <Button
                                        type='primary'
                                        size='large'
                                        icon='check'
                                        style={{marginTop: '50px'}}
                                        // onClick={this.toggleCreateTradeModal}
                                    >
                                        Accept Trade
                                    </Button>
                                </Col>
                                <Col span={12}  style={{textAlign: 'center'}}>
                                    <Button
                                        type='danger'
                                        size='large'
                                        icon='close'
                                        style={{marginTop: '50px'}}
                                        // onClick={this.toggleCreateTradeModal}
                                    >
                                        Decline Trade
                                    </Button>
                                </Col>
                            </Row>
                        )
                        : ''
                    }
                </div>
            ) :
            (
                <Row>
                    <Col style={{textAlign: 'center'}}>
                        <Spin size='large' style={{textAlign: 'center'}}/>
                    </Col>
                </Row>
            );
    }
}

export default Contract;
