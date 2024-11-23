declare module "randm" {
  type DiceRollDetails = {
    rolls: number[];
    unmodifiedTotal: number;
    modifier: number | string;
    total: number;
  };

  interface Bag {
    put(item: any): void;
    pick(): any;
    contents(): ReadonlyArray<any>;
    isEmpty(): boolean;
    reset(): void;
  }

  interface Randm {
    any(): number;
    bool(): boolean;
    coinFlip(): "heads" | "tails";
    dateTime(): Date;
    diceRoll(die?: string): number;
    diceRollBeats(target: number): boolean;
    diceRollOf(die: string): {
      beats(target: number): boolean;
      isGreaterThan(target: number): boolean;
      isGreaterThanOrEqual(target: number): boolean;
      isLessThan(target: number): boolean;
      isLessThanOrEqual(target: number): boolean;
      rolls(): DiceRollDetails;
      roll(): DiceRollDetails;
    };
    artilleryDie(): number | "MISS";
    scatterDie(): { direction: number; isHit: boolean };
    between(x: number, y: number): number;
    oneIn(n: number): boolean;
    from<T>(arry: T[]): T;
    happens(times: number): { outOf(total: number): boolean };
    percentageChance(percentage: number): boolean;
    customDiceRoll(die: string): number;
    int: {
      between(x: number, y: number): number;
    };
    date: {
      between(x: Date, y: Date): Date;
    };
    bag(contents?: any[]): Bag;
    next: {
      int: {
        between: {
          returns(...vals: number[]): void;
        };
      };
      reset(): void;
    };
  }

  const randm: Randm;
  export = randm;
}
