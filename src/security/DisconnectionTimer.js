class DisconnectionTimer {
  constructor( maxIdleTime /*second*/, onTimeout,TimeoutTimer=true) {
    console.log("time login",new Date().toLocaleTimeString())
    this.maxIdleTime = maxIdleTime
    this.onTimeout = onTimeout
    if (TimeoutTimer) { /*Timeout timer is reset on every event*/
      this.eventHandler=this.resetTimer.bind(this)
    }
    else { /* samples every second to check if maxidletime is passed*/
      this.limitTime=undefined
      this.intervalControlTime=1 //1s
      this.eventHandler = this.setlimitTime.bind(this)
      this.setlimitTime()
      this.startRegularIntervalMonitoring()
    }
    this.activityMonitoringTrigger()
    
  }

  resetTimer=()=>{
    if(this.timeoutId) clearTimeout(this.timeoutId)
    this.timeoutId= setTimeout(() => {
      //timeout is reached
      
        console.log("time at disconnection",new Date().toLocaleTimeString())
        this.cleanUp()
        this.onTimeout()},this.maxIdleTime*1000)
  }  

  
  // this procdedure defines the time after which the system will be disconnected 
  // if there is no further interaction  
  //this time is set again after each user interaction
  //limitTime is in ms 
  setlimitTime =()=>{
    this.limitTime=Date.now()+this.maxIdleTime*1000
  }

  //checks the max limit time every Intervalcontorltime instead of resetting it on every event  
  
  startRegularIntervalMonitoring() {
    this.intervalId=setInterval(() => {
      //timeout is reached
      if(this.limitTime< Date.now()) {
        console.log("time at disconnection",Date.now())
        this.cleanUp()
        this.onTimeout()
      }
    }, this.intervalControlTime*1000);

  }
  
  
  
  activityMonitoringTrigger=() =>{
    window.addEventListener("keydown", this.eventHandler);
    window.addEventListener("scroll", this.eventHandler);
    window.addEventListener("mousemove", this.eventHandler);
    window.addEventListener("mouseenter", this.eventHandler);
  }

  cleanUp() {
    if(this.intervalId) {
      clearInterval(this.intervalId)
    }
    if(this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    window.removeEventListener("keydown", this.eventHandler);  
    window.removeEventListener("scroll", this.eventHandler);
    window.removeEventListener("mousemove", this.eventHandler);
    window.removeEventListener("mouseenter",this.eventHandler);
  }
}

export default DisconnectionTimer;
