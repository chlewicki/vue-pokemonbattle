new Vue({
    el: '#app',
    data: {
        freeze: true,
        enemy: 'Mewtwo',
        me: 'Diglett',
        myFullHealth: 100,
        enemyFullHealth: 100,
        enemyCurrHealth: 100,
        myCurrHealth: 100,
        isAttacking: false,
        enemyTurn: false,
        logs: []
    },
    methods: {
        startGame: function () {
            this.myCurrHealth = 100;
            this.enemyCurrHealth = 100;
            this.isAttacking = false;
            this.enemyTurn = false;
            this.freeze = false;
            this.logs = [];
        },
        attack: function () {
            this.disableButtons();
            this.logs.unshift({ user: this.me, attack: 'attack' });
            var rand = Math.floor(Math.random() * 5) + 1;
            var vm = this;
            var after = this.enemyCurrHealth - rand;
            var attack = setInterval(function () {
                if (vm.enemyCurrHealth <= 0) {
                    clearInterval(attack);
                    alert('you win');
                    vm.freeze = true;
                    vm.enableButtons();
                } else {
                    if (vm.enemyCurrHealth > after) {
                        vm.isAttacking = true;
                        vm.enemyCurrHealth--;
                    } else {
                        vm.isAttacking = false;
                        clearInterval(attack);
                        vm.enemyTurn = true;
                    }
                }
            }, 50);
            var check = setInterval(function () {
                if (vm.isAttacking == true) {
                    vm.move();
                    clearInterval(check);
                    var move = setInterval(function () {
                        if (vm.isAttacking == false) {
                            vm.stopMove();
                            clearInterval(move);
                        }
                    }, 50);
                }
            }, 50);
        },
        specialAttack: function () {
            this.disableButtons();
            var rand = Math.floor(Math.random() * 10) + 1;
            var rand2;
            if (rand <= 5) {
                rand2 = Math.floor(Math.random() * 2) + 1;
                this.logs.unshift({ user: this.me, attack: 'special attack, but it failed' });
            } else {
                rand2 = Math.floor(Math.random() * 15) + 5;
                this.logs.unshift({ user: this.me, attack: 'special attack and it was succesfull' });
            }
            var vm = this;
            var after = this.enemyCurrHealth - rand2;
            var attack = setInterval(function () {
                if (vm.enemyCurrHealth <= 0) {
                    clearInterval(attack);
                    alert('you win');
                    vm.freeze = true;
                    vm.enableButtons();
                } else {
                    if (vm.enemyCurrHealth > after) {
                        vm.isAttacking = true;
                        vm.enemyCurrHealth--;
                    } else {
                        vm.isAttacking = false;
                        clearInterval(attack);
                        vm.enemyTurn = true;
                    }
                }
            }, 50);
            var check = setInterval(function () {
                if (vm.isAttacking == true) {
                    vm.move();
                    clearInterval(check);
                    var move = setInterval(function () {
                        if (vm.isAttacking == false) {
                            vm.stopMove();
                            clearInterval(move);
                        }
                    }, 50);
                }
            }, 50);
        },
        heal: function () {
            this.disableButtons();
            if (this.myCurrHealth == this.myFullHealth) {
                alert('you are fully healed!');
                this.enableButtons();
            } else {
                this.logs.unshift({ user: this.me, attack: 'heal' });
                var rand = Math.floor(Math.random() * 5) + 1;
                var vm = this;
                var after = this.myCurrHealth + rand;
                var heal = setInterval(function () {
                    if (vm.myCurrHealth >= vm.myFullHealth) {
                        vm.myCurrHealth = vm.myFullHealth;
                        clearInterval(heal);
                        vm.enemyTurn = true;
                    } else {
                        if (vm.myCurrHealth < after) {
                            vm.isAttacking = true;
                            vm.myCurrHealth++;
                        } else {
                            vm.isAttacking = false;
                            clearInterval(heal);
                            vm.enemyTurn = true;
                        }
                    }
                }, 50);
            }
        },
        enemyChoose: function () {
            var rand = Math.floor(Math.random() * 3) + 1;
            if (rand == 1) {
                this.enemyAttack();
            } else if (rand == 2) {
                this.enemySpecialAttack();
            } else {
                this.enemyHeal();
            }
        },
        enemyAttack: function () {
            var rand = Math.floor(Math.random() * 10) + 1;
            var vm = this;
            var after = this.myCurrHealth - rand;
            this.logs.unshift({ user: this.enemy, attack: 'attack' });
            var attack = setInterval(function () {
                if (vm.myCurrHealth <= 0) {
                    clearInterval(attack);
                    alert('you loose');
                    vm.freeze = true;
                    vm.enableButtons();
                } else {
                    if (vm.myCurrHealth > after) {
                        vm.isEnemyAttacking = true;
                        vm.myCurrHealth--;
                    } else {
                        vm.isEnemyAttacking = false;
                        clearInterval(attack);
                        vm.enemyTurn = false;
                        vm.enableButtons();
                    }
                }
            }, 50);
            var check = setInterval(function () {
                if (vm.isEnemyAttacking == true) {
                    vm.enemyMove();
                    clearInterval(check);
                    var move = setInterval(function () {
                        if (vm.isEnemyAttacking == false) {
                            vm.stopEnemyMove();
                            clearInterval(move);
                        }
                    }, 50);
                }
            }, 50);
        },
        enemySpecialAttack: function () {
            var rand = Math.floor(Math.random() * 10) + 1;
            var rand2;
            if (rand <= 5) {
                rand2 = Math.floor(Math.random() * 2) + 1;
                this.logs.unshift({ user: this.enemy, attack: 'special attack, but it failed' });
            } else {
                rand2 = Math.floor(Math.random() * 15) + 5;
                this.logs.unshift({ user: this.enemy, attack: 'special attack and it was successfull' });
            }
            var vm = this;
            var after = this.myCurrHealth - rand2;
            var attack = setInterval(function () {
                if (vm.myCurrHealth <= 0) {
                    clearInterval(attack);
                    alert('you loose');
                    vm.freeze = true;
                    vm.enableButtons();
                } else {
                    if (vm.myCurrHealth > after) {
                        vm.isEnemyAttacking = true;
                        vm.myCurrHealth--;
                    } else {
                        vm.isEnemyAttacking = false;
                        clearInterval(attack);
                        vm.enemyTurn = false;
                        vm.enableButtons();
                    }
                }
            }, 50);
            var check = setInterval(function () {
                if (vm.isEnemyAttacking == true) {
                    vm.enemyMove();
                    clearInterval(check);
                    var move = setInterval(function () {
                        if (vm.isEnemyAttacking == false) {
                            vm.stopEnemyMove();
                            clearInterval(move);
                        }
                    }, 50);
                }
            }, 50);
        },
        enemyHeal: function () {
            if (this.enemyCurrHealth == this.enemyFullHealth) {
                this.enemyMove();
            } else {
                this.logs.unshift({ user: this.enemy, attack: 'heal' });
                var rand = Math.floor(Math.random() * 5) + 1;
                var vm = this;
                var after = this.enemyCurrHealth + rand;
                var heal = setInterval(function () {
                    if (vm.enemyCurrHealth >= vm.enemyFullHealth) {
                        vm.enemyCurrHealth = vm.enemyFullHealth;
                        clearInterval(heal);
                        vm.enemyTurn = false;
                        vm.enableButtons();
                    } else {
                        if (vm.enemyCurrHealth < after) {
                            vm.isEnemyAttacking = true;
                            vm.enemyCurrHealth++;
                        } else {
                            vm.isEnemyAttacking = false;
                            clearInterval(heal);
                            vm.enemyTurn = false;
                            vm.enableButtons();
                        }
                    }
                }, 50);
            }
        },
        move: function () {
            document.querySelectorAll('.characterimage')[1].style.marginLeft = '20px';
        },
        stopMove: function () {
            document.querySelectorAll('.characterimage')[1].style.marginLeft = '0';
        },
        enemyMove: function () {
            document.querySelectorAll('.characterimage')[0].style.marginRight = '20px';
        },
        stopEnemyMove: function () {
            document.querySelectorAll('.characterimage')[0].style.marginRight = '0';
        },
        disableButtons: function () {
            document.querySelectorAll('button').forEach((button) => {
                button.disabled = true;
            })
        },
        enableButtons: function () {
            document.querySelectorAll('button').forEach((button) => {
                button.disabled = false;
            })
        }
    },
    watch: {
        enemyTurn: function (value) {
            if (value == true) {
                this.enemyChoose();
            } else {
                this.enableButtons();
            }
        }
    }
})