import api from "../api";
import { extendObservable, action } from "mobx";
import { makePersistable } from "mobx-persist-store";

export type ShipType = {
  patp: string;
  metadata?: {
    color: string;
  };
};

class ShipStore {
  public ship?: ShipType;

  constructor() {
    extendObservable(this, {
      ship: {
        patp: api.ship,
        metadata: {
          color: "#ff810a",
        },
      },
    });
    makePersistable(this, {
      name: "ShipStore",
      properties: ["ship"],
      storage: window.localStorage,
    });
  }

  initialize = action(() => {});

  setShip = action((ship: ShipType) => {
    this.ship = ship;
  });
}

export default ShipStore;
