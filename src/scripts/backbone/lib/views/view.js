import Marionette from "backbone.marionette";
import _ from "underscore";

export default Marionette.View.extend({

  emptyRegions() {
    const regions = _.keys(this.regions);
    _.each(regions, (region) => {
      this.getRegion(region).empty();
    });
  }

});
