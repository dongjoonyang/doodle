module.exports = {
  apps : [{
    script    : "./bin/www", 
    instances : "max", 
    exec_mode : "cluster"
  }]
}