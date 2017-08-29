# Maze Reinforcement

Implementation of Reinforcement Learning using [Reinforcement.js](http://cs.stanford.edu/people/karpathy/reinforcejs/) in my [Maze Generation Algorithm](https://github.com/naumanumer/maze).

## Environment
Main api for the environment is taken from [Maze Generation Algorithm](https://github.com/naumanumer/maze). But, in the world (implemented for reinforcement learning) has following things:

1. `reset` to reset the game state.
2. `reward` return reward from current state, action and next state.
3. `sampleNextState` calculate next state and reward from an action suggested by agent.
4. `allowedActions` return allowed actions at current cell.

Beside everything in world call are helpers.

## Reward
The rewards given to the agent are under following conditions:

1. `-0.01` on every move. So that agent don't stuck on same place.
2. When agent solves the puzzle give positive reward equal to the size of puzzle.
3. `-0.1` on start, top right and bottom left tiles.

## Specs


| Spec                                   | Value      |
|:---------------------------------------|:-----------|
| Discount Factor (gamma)                | `0.9`      |
| Epsilon-greedy Policy                  | `0.2`      |
| Learning Rate (alpha)                  | `0.3`      |
| Eligibility trace decay (lambda)       | `0`        |
| Replacing Traces                       | `true`     |
| Number of planning steps per iteration | `50`       |
| Smooth Policy Update                   | `true`     |
| Learning Rate for Smooth Policy (beta) | `0.1`      |
