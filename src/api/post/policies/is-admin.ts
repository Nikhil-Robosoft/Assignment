export default (policyContext, config, { strapi }) => {
    if (policyContext.state.user) { // if a session is open
      // go to next policy or reach the controller's action
      strapi.log.info("user is",policyContext.state.user)
      // return true;
    }
    strapi.log.info("--------hello---------",)
    // return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
  };