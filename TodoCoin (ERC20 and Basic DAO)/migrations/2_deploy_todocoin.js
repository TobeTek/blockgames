const TodoCoin = artifacts.require("TodoCoin");
const TaskMaster = artifacts.require("TaskMaster");

module.exports = async function(deployer) {
    await deployer.deploy(TaskMaster);
    await deployer.deploy(TodoCoin, TaskMaster.address);
};