function initAgent() {
    state = agent = env = null;
    n = gen = nsteps_counter=0;
    steps_per_tick =1;
    sid= -1;
    nsteps_history =[];
    nflot =1000

    data = [['Generation', 'No. of Actions']]

    start();
}

var state;
var agent, env, n = 0;

var gen = 0;

function start() {
    env = new GameWorld(); // create environment
    state = env.startState();

    // agent parameter spec to play with
    var spec = {}
    spec.update = 'qlearn'; // 'qlearn' or 'sarsa'
    spec.gamma = 0.9; // discount factor, [0, 1)
    spec.epsilon = 0.2; // initial epsilon for epsilon-greedy policy, [0, 1)
    spec.alpha = 0.3; // value function learning rate
    spec.lambda = 0; // eligibility trace decay, [0,1). 0 = no eligibility traces
    spec.replacing_traces = true; // use replacing or accumulating traces
    spec.planN = 50; // number of planning steps per iteration. 0 = no planning

    spec.smooth_policy_update = true; // non-standard, updates policy smoothly to follow max_a Q
    spec.beta = 0.1; // learning rate for smooth policy update

    agent = new RL.TDAgent(env, spec);
}

var steps_per_tick = 1;
var sid = -1;
var nsteps_history = [];
var nsteps_counter = 0;
var nflot = 1000;

var tdlearn = function () {
    dev = true
    if (sid === -1) {
        sid = setInterval(function () {
            for (var k = 0; k < steps_per_tick; k++) {

                var a = agent.act(state); // ask agent for an action
                var obs = env.sampleNextState(state, a); // run it through environment dynamics
                agent.learn(obs.r); // allow opportunity for the agent to learn
                state = obs.ns; // evolve environment to next state
                nsteps_counter += 1;

                drawWeights();
                if (typeof obs.reset_episode !== 'undefined') {
                    agent.resetEpisode();
                    resetPlayer();
                    // record the reward achieved
                    if (nsteps_history.length >= nflot)
                        nsteps_history = nsteps_history.slice(1);

                    // draw graph
                    n++;
                    data.push([n, nsteps_counter]);

                    if (data.length >= 101)
                        data.splice(1, 1);
                    try {
                        drawChart();
                    } catch (error) {}

                    gen++;
                    writeOnConsole(`Iteration ${gen} ends in ${nsteps_counter} actions`);

                    nsteps_history.push(nsteps_counter);
                    nsteps_counter = 0;
                }

            }
            // keep track of reward history
        }, 20);
    } else {
        clearInterval(sid);
        sid = -1;
    }
}
