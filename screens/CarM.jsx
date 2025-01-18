import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";

const randomX = () => Math.floor(Math.random() * 300); // Random X position

const Physics = (entities, { time }) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);

  // Move coins downward and reset when off-screen
  Object.keys(entities).forEach((key) => {
    let entity = entities[key];
    if (entity && entity.type === "coin") {
      entity.body.position.y += 5;
      if (entity.body.position.y > 600) {
        Matter.Body.setPosition(entity.body, { x: randomX(), y: -10 });
      }
    }
  });

  return entities;
};

const checkCollision = (car, coin) => {
  return (
    car.position.x < coin.position.x + 20 &&
    car.position.x + 50 > coin.position.x &&
    car.position.y < coin.position.y + 20 &&
    car.position.y + 50 > coin.position.y
  );
};

const Game = () => {
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const setupWorld = () => {
    let engine = Matter.Engine.create();
    let world = engine.world;

    // Car
    const car = Matter.Bodies.rectangle(160, 500, 50, 50, { isStatic: true });

    // Coin
    const coin = Matter.Bodies.circle(randomX(), -10, 20, { isStatic: false });

    Matter.World.add(world, [car, coin]);

    return {
      physics: { engine, world },
      car: { body: car, color: "blue", renderer: Box },
      coin: { body: coin, color: "gold", renderer: Circle, type: "coin" },
    };
  };

  const entities = setupWorld();

  useEffect(() => {
    const interval = setInterval(() => {
      const car = entities.car.body;
      const coin = entities.coin.body;

      if (checkCollision(car, coin)) {
        setScore((prev) => prev + 1);
        Matter.Body.setPosition(coin, { x: randomX(), y: -10 });
        if ((score + 1) % 10 === 0) {
          setLevel((prev) => prev + 1);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [score, entities]);

  const moveCar = (direction) => {
    const car = entities.car.body;
    Matter.Body.setPosition(car, {
      x: car.position.x + direction,
      y: car.position.y,
    });
  };

  return (
    <View style={styles.container}>
      <GameEngine
        style={styles.gameContainer}
        systems={[Physics]}
        entities={entities}
        running={running}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => moveCar(-20)}>
          <Text style={styles.button}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveCar(20)}>
          <Text style={styles.button}>Right</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.level}>Level: {level}</Text>
    </View>
  );
};

const Box = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={[
        styles.box,
        { width, height, left: x, top: y, backgroundColor: props.color },
      ]}
    />
  );
};

const Circle = (props) => {
  const radius = props.body.circleRadius;
  const x = props.body.position.x - radius;
  const y = props.body.position.y - radius;

  return (
    <View
      style={[
        styles.circle,
        {
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          left: x,
          top: y,
          backgroundColor: props.color,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  gameContainer: { flex: 1 },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  score: {
    position: "absolute",
    top: 20,
    left: 20,
    color: "#fff",
    fontSize: 18,
  },
  level: {
    position: "absolute",
    top: 20,
    right: 20,
    color: "#fff",
    fontSize: 18,
  },
  box: {
    position: "absolute",
  },
  circle: {
    position: "absolute",
  },
});

export default Game;