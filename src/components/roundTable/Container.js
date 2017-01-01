import { connect } from 'react-redux';
import React from 'react';
import { hashHistory } from 'react-router';
import RoundTable from './Component';
import { endGame } from '../../actions/gameActions'

const mapStateToProps = (state) => {
    const roundScores = buildScores(state.players, state.rounds);

    return {
        players: state.players,
        roundScores: roundScores,
        game: state.game,
        winner: getWinner(roundScores, state.players, state.game.maxScore)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGameComplete: () => {
            dispatch(endGame());
        },
    }
};

const buildScores = (players, rounds) => {
    let accumulativePoints = {};
    players.forEach(player => accumulativePoints[player.id] = 0);

    return rounds.map(round => ({
        roundId: round.id,
        scores: players.map(player => ({
            playerId: player.id,
            roundPoints: round.scores[player.id],
            accumulativePoints: (accumulativePoints[player.id] += round.scores[player.id])
        }))
    }));
};

const getWinner = (roundScores, players, maxScore) => {
    if (roundScores.length) {
        const lastRoundScores = roundScores[roundScores.length - 1].scores;
        const nonLosers = lastRoundScores.filter(score => score.accumulativePoints <= maxScore);

        if (nonLosers.length === 1) {
            const winnerId = nonLosers[0].playerId;
            return players.find(player => player.id === winnerId);
        }
    }
    return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(RoundTable);