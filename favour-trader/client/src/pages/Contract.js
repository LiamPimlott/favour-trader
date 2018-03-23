import React, {Component} from 'react';
import TradeOverview from '../components/TradeOverview.js';
import TradeFavours from '../components/TradeFavours.js';
import axios from 'axios'
import {Row, Col, Button, Spin, Popover, Alert} from 'antd';
import Redirect from 'react-router-dom/Redirect';

const OFFEROR = 'offeror';
const OFFEREE = 'offeree';

class Contract extends Component {
    
    constructor() {
        super();
        this.state = { 
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
            acceptTradeWaiting: false,
            declineTradeWaiting: false,
            requestTerminationWaiting: false,
            pageLoaded: false,
        };
    }

    toggleFavourCompleted = (favourId) => {
        const { authService } = this.props;
        const { userUpdatedFavours } = this.state;
        if (authService.loggedIn()) {
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
        } else {
            this.setState({
                redirect: true,
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
            const tradeId = params.tradeID;
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
            });
        } else {
            this.setState({
                redirect: true,
            });
        }
    }

    cancelEditedFavours = () => {
        const { authService } = this.props;
        const { isUserOfferor, favours } = this.state;
        if (authService.loggedIn()) {
            const userRole = isUserOfferor ? OFFEROR : OFFEREE;
            this.setState({ 
                userUpdatedFavours: favours[userRole],
                favoursEdited: false,
            });
        } else {
            this.setState({
                redirect: true,
            });
        }
    }

    acceptTrade = () => {
        const { authService, match: { params } } = this.props;
        if (authService.loggedIn()) {
            const headers = {
                    Authorization: authService.getToken(),
            };
            const base = window.location.origin;
            const tradeId = params.tradeID;
            const endpoint = `api/contracts/${tradeId}/status`;
            const body = { status: "Accepted" };
            this.setState({ acceptTradeWaiting: true });
            axios({
                method: 'put',
                headers: headers,
                baseURL: base,
                url: endpoint,
                data: body
            })
            .then(res => res.data.contract.status)
            .then(updatedStatus => {
                this.setState({
                    status: updatedStatus,
                    acceptTradeWaiting: false, 
                });
            })
            .catch((err) => {
                this.setState({
                    acceptTradeWaiting: false,
                })
                console.log(err);
            });
        } else {
            this.setState({
                redirect: true,
            });
        }
    }

    declineTrade = () => {
        const { authService, match: { params } } = this.props;
        if (authService.loggedIn()) {
            const headers = {
                    Authorization: authService.getToken(),
            };
            const base = window.location.origin;
            const tradeId = params.tradeID;
            const endpoint = `api/contracts/${tradeId}/status`;
            const body = { status: "Declined" };
            this.setState({ declineTradeWaiting: true });
            axios({
                method: 'put',
                headers: headers,
                baseURL: base,
                url: endpoint,
                data: body
            })
            .then(res => res.data.contract.status)
            .then(updatedStatus => {
                this.setState({
                    status: updatedStatus,
                    redirect: true,
                    declineTradeWaiting: false, 
                });
            })
            .catch((err) => {
                this.setState({
                    declineTradeWaiting: false,
                })
                console.log(err);
            });
        } else {
            this.setState({
                redirect: true,
            });
        }
    }

    requestTermination = () => {
        const { authService, match: { params } } = this.props;
        const { isUserOfferor } = this.state;
        if (authService.loggedIn()) {
            const userRole = isUserOfferor ? OFFEROR : OFFEREE;
            const headers = {
                    Authorization: authService.getToken(),
            };
            const base = window.location.origin;
            const tradeId = params.tradeID;
            const endpoint = `api/contracts/${tradeId}/terminate`;
            this.setState({ requestTerminationWaiting: true });
            axios({
                method: 'put',
                headers: headers,
                baseURL: base,
                url: endpoint,
            })
            .then(res => res.data.contract[userRole])
            .then(updatedUserRoleField => {
                let terminationStateChanges = { redirect: true, requestTerminationWaiting: false };
                terminationStateChanges[userRole] = updatedUserRoleField;
                this.setState(terminationStateChanges);
            })
            .catch((err) => {
                this.setState({ requestTerminationWaiting: false });
                console.log(err);
            });
        } else {
            this.setState({ redirect: true });
        }
    }

    componentWillMount(){
        const { authService, match: { params }  } = this.props;
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
        } else {
            this.setState({
                redirect: true,
            });
        }
    }

    render() {
        const {
            status, favours, offeror, messages, 
            redirect, offeree, isUserOfferor,
            favoursEdited, saveFavoursWaiting, userUpdatedFavours,
            pageLoaded, acceptTradeWaiting, declineTradeWaiting,
            requestTerminationWaiting,
        } = this.state;
        const userRole = isUserOfferor ? offeror : offeree;
        const otherPartyRole = isUserOfferor ? offeree : offeror;

        return pageLoaded ?
            (
                <div >
                    {(redirect && status === "Declined") ?
                        <Redirect to={'/trades/received'}/> : ''
                    }
                    {(redirect) &&
                        <Redirect to={'/login'}/>
                    }
                    {(otherPartyRole.requestTermination && status !== 'Terminated' && status !== 'Completed' ? 
                        (
                            <Row>
                                <Col span={24} style={{textAlign: 'center', marginBottom: '50px'}}>
                                    <Alert 
                                        message={otherPartyRole.firstName + ' has requested to end the contract.'}
                                        type='warning'
                                    />
                                </Col>
                            </Row>
                        ) : ''
                    )}
                    <Row>
                        <TradeOverview 
                            status={status}
                            offeror={offeror}
                            offeree={offeree}
                            messages={messages[0]}
                        />
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
                                        onClick={this.acceptTrade}
                                        loading={acceptTradeWaiting}
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
                                        onClick={this.declineTrade}
                                        loading={declineTradeWaiting}
                                    >
                                        Decline Trade
                                    </Button>
                                </Col>
                            </Row>
                        )
                        : ( userRole.requestTermination || status === 'Terminated' ? 
                            (
                                <Row>
                                    <Col span={24}  style={{textAlign: 'center'}}>
                                        <Popover content="Awaiting approval from other party." trigger="hover">
                                            <Button 
                                                size ="large"
                                                type="normal"
                                                style={{marginTop: '50px'}}
                                            >
                                                Completion/Termination Requested
                                            </Button>
                                        </Popover>
                                    </Col>
                                </Row>
                            )
                            : (
                                <Row>
                                    <Col span={24}  style={{textAlign: 'center', marginTop: '50px'}}>
                                        <Button
                                            type='danger'
                                            size='large'
                                            icon='checkCircle'
                                            onClick={this.requestTermination}
                                            loading={requestTerminationWaiting}
                                        >
                                            Complete/Terminate Trade
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        )
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
