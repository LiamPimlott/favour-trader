import axios from 'axios'
import Main from "./Main"

class FilterHas extends Main {
    componentDidMount() {
        const { authService } = this.props;
        if (authService.loggedIn()) {
            const config = {
                headers: {
                    Authorization: authService.getToken()
                },
				params: {
					hasFilter: 'true',
					wantsFilter: 'false'
				}
            };

            axios.get('/api/users/matches', config)
            .then(res => res.data.matches)
            .then(matches => this.setState({matchedUsers: matches }))
            .catch( (err) => {
                console.log(err);
            });
        }
    }
}

export default FilterHas;