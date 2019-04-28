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
        isAttacking: '',
        isEnemyAttacking: '',
        enemyTurn: false,
        enemySpecials: 10,
        enemyHeals: 5,
        mySpecials: 10,
        myHeals: 5,
        logs: []
    },
    methods: {
        startGame: function () {
            this.myCurrHealth = 100;
            this.enemyCurrHealth = 100;
            this.isAttacking = '';
            this.isEnemyAttacking = '';
            this.enemyTurn = false;
            this.freeze = false;
            this.enemySpecials = 10;
            this.enemyHeals = 5;
            this.mySpecials = 10;
            this.myHeals = 5;
            this.logs = [];
        },
        attack: function () {
            this.disableButtons();
            this.logs.unshift({ user: this.me, attack: 'attack' });
            var after = this.enemyCurrHealth - this.calcDamage(3, 7);
            this.attackModel('enemy', after);
        },
        specialAttack: function () {
            this.disableButtons();
            if (this.mySpecials > 0) {
                var after = this.enemyCurrHealth - this.calcSpecial(this.me);
                this.attackModel('enemy', after);
                this.mySpecials--;
            } else {
                this.enableButtons();
            }

        },
        heal: function () {
            this.disableButtons();
            if (this.myCurrHealth == this.myFullHealth) {
                alert('you are fully healed!');
                this.enableButtons();
            } else {
                if (this.myHeals > 0) {
                    this.logs.unshift({ user: this.me, attack: 'heal' });
                    var after = this.myCurrHealth + this.calcDamage(7, 20);
                    this.healModel('me', after);
                    this.myHeals--;
                    return;
                }
                this.enableButtons();
            }
        },
        enemyMove: function () {
            var rand = this.calcDamage(1, 3);
            if (rand == 1) {
                this.enemyAttack();
            } else if (rand == 2) {
                this.enemySpecialAttack();
            } else {
                this.enemyHeal();
            }
        },
        enemyAttack: function () {
            var after = this.myCurrHealth - this.calcDamage(3, 12);
            this.logs.unshift({ user: this.enemy, attack: 'attack' });
            this.attackModel('me', after);
        },
        enemySpecialAttack: function () {
            if (this.enemySpecials > 0) {
                var after = this.myCurrHealth - this.calcSpecial(this.enemy);
                this.attackModel('me', after);
                this.enemySpecials--;
            } else {
                this.enemyMove();
            }

        },
        enemyHeal: function () {
            if (this.enemyCurrHealth == this.enemyFullHealth) {
                this.enemyMove();
            } else {
                if (this.enemyHeals > 0) {
                    this.logs.unshift({ user: this.enemy, attack: 'heal' });
                    var after = this.enemyCurrHealth + this.calcDamage(3, 10);
                    this.healModel('enemy', after);
                    this.enemyHeals--;
                } else {
                    this.enemyMove();
                }
            }
        },
        healModel: function (player, after) {
            var vm = this;
            var heal = setInterval(function () {
                if (player == 'enemy') {
                    if (vm.enemyCurrHealth >= vm.enemyFullHealth) {
                        vm.enemyCurrHealth = vm.enemyFullHealth;
                        clearInterval(heal);
                        vm.enemyTurn = false;
                        vm.enableButtons();
                    } else {
                        if (vm.enemyCurrHealth < after) {
                            vm.isEnemyAttacking = '20px';
                            vm.enemyCurrHealth++;
                        } else {
                            vm.isEnemyAttacking = 0;
                            clearInterval(heal);
                            vm.enemyTurn = false;
                            vm.enableButtons();
                        }
                    }
                } else {
                    if (vm.myCurrHealth >= vm.myFullHealth) {
                        vm.myCurrHealth = vm.myFullHealth;
                        clearInterval(heal);
                        vm.enemyTurn = true;
                    } else {
                        if (vm.myCurrHealth < after) {
                            vm.isAttacking = '20px';
                            vm.myCurrHealth++;
                        } else {
                            vm.isAttacking = 0;
                            clearInterval(heal);
                            vm.enemyTurn = true;
                        }
                    }
                }
            }, 50);
        },
        attackModel: function (enemy, after) {
            var vm = this;
            var attack = setInterval(function () {
                if (enemy == 'enemy') {
                    if (vm.enemyCurrHealth <= 0) {
                        clearInterval(attack);
                        alert('you win');
                        vm.freeze = true;
                        vm.enableButtons();
                    } else {
                        if (vm.enemyCurrHealth > after) {
                            vm.isAttacking = '20px';
                            vm.enemyCurrHealth--;
                        } else {
                            vm.isAttacking = 0;
                            clearInterval(attack);
                            vm.enemyTurn = true;
                        }
                    }
                } else {
                    if (vm.myCurrHealth <= 0) {
                        clearInterval(attack);
                        alert('you loose');
                        vm.freeze = true;
                        vm.enableButtons();
                    } else {
                        if (vm.myCurrHealth > after) {
                            vm.isEnemyAttacking = '20px';
                            vm.myCurrHealth--;
                        } else {
                            vm.isEnemyAttacking = 0;
                            clearInterval(attack);
                            vm.enemyTurn = false;
                            vm.enableButtons();
                        }
                    }
                }
            }, 50);

        },
        disableButtons: function () {
            document.querySelectorAll('button').forEach((button) => {
                button.disabled = true;
            })
        },
        enableButtons: function () {
            document.querySelectorAll('button').forEach((button) => {
                button.disabled = false;
            });
            if (this.myHeals <= 0) {
                document.querySelector('#heal').disabled = true;
            }
            if (this.mySpecials <= 0) {
                document.querySelector('#specialattack').disabled = true;
            }
        },
        calcDamage: function (min, max) {
            return Math.floor(Math.random() * max) + min;
        },
        calcSpecial: function (player) {
            var rand = this.calcDamage(1, 10);
            if (rand <= 5) {
                rand = this.calcDamage(1, 2);
                this.logs.unshift({ user: player, attack: 'special attack, but it failed' });
            } else {
                rand = this.calcDamage(5, 15);
                this.logs.unshift({ user: player, attack: 'special attack and it was successfull' });
            }
            return rand;
        }
    },
    watch: {
        enemyTurn: function (value) {
            if (value == true) {
                this.enemyMove();
            } else {
                this.enableButtons();
            }
        }
    }
})