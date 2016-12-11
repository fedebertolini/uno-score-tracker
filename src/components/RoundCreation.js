import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { GAME_STATUS_IN_PROGRESS, GAME_STATUS_FINISHED } from '../constants';

class RoundCreation extends React.Component {
    render() {
        return (
            <form onSubmit={this.submitRound.bind(this)}>
                <table>
                    <tbody>
                        {this.props.players.map(player =>
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td><input type="number" min="0" ref={player.id} defaultValue="0"></input></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button type="submit">Save</button>
            </form>
        )
    }

    componentWillMount() {
        const validStatus = [GAME_STATUS_IN_PROGRESS, GAME_STATUS_FINISHED];
        if (!validStatus.some(status => status === this.props.game.status)) {
            hashHistory.push('/');
        }
    }

    submitRound(event) {
        event.preventDefault();
        let scores = {};
        this.props.players.forEach(player => {
            const input = this.refs[player.id];
            scores[player.id] = input.value ? parseInt(input.value) : 0;
        });
        this.props.onAddRound(scores);
    }
}

RoundCreation.propTypes = {
    players: PropTypes.array.isRequired,
};

export default RoundCreation;