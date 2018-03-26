import axios from 'axios'
import Main from "./Main"

class FilterWants extends Main {
    componentDidMount() {
        const { authService } = this.props;
        if (authService.loggedIn()) {
            const config = {
                headers: {
                    Authorization: authService.getToken()
                },
				params: {
					hasFilter: 'false',
					wantsFilter: 'true'
				}
            };

            axios.get('/api/users/matches', config)
            .then(res => res.data.matches)
            .then(matches => this.setState({matchedUsers: matches }))
            .catch( (err) => {
                console.log(err);
            });
        } else {
            this.setState({ redirect: true });
        }
    }
}

export default FilterWants;