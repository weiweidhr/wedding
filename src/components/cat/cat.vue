<template>
    <canvas class="zdog-canvas"></canvas>
</template>
<script>
  import tools from '../../services/tools';
  const URL = 'https://unpkg.com/zdog@1/dist/zdog.dist.min.js';
  const pink = '#41546a';
  const blush = '#F5A';
  const black = '#000';
  const shoe = '#41546a';
  const red = '#ce0f00';
  const yellow = '#FD0';

  export default {
    name: "cat",
    props: ["move"],
    data () {
      return {
        sceneSize: 80,
        isSpinning: false,
        TAU: null,
        illo: null,
        body: null,
        body2: null,
        face: null,
        tail: null,
        tail2: null,
        eyeGroup: null,
        cheekHolder: null,
        rightArm: null,
        leftArm: null,
        rightArm2: null,
        rightFoot: null,
        umbrella: null
      };
    },
    methods: {
      initModule() {
        let page = this;
        this.illo = new Zdog.Illustration({
          element: '.zdog-canvas',
          dragRotate: true,
          resize: 'fullscreen',
          onDragStart: function () {
            page.isSpinning = !page.isSpinning;
            page.$parent.control(page.isSpinning);
          },
          onResize: function (width, height) {
            this.zoom = Math.floor(Math.min(width, height) / page.sceneSize);
          },
        });
        this.body = new Zdog.Shape({
          stroke: 22,
          translate: {y: 11},
          rotate: {x: 0.3, z: 0.1},
          addTo: page.illo,
          color: pink,
        });
        this.body2 = new Zdog.Shape({
          stroke: 22,
          translate: {y: 22},
          rotate: {x: 0.3, z: 0.1},
          addTo: page.illo,
          color: pink,
        });

        this.face = new Zdog.Anchor({
          translate: {z: 10.5},
          addTo: page.body,
        });
        // 尾巴
        this.tail = new Zdog.Shape({
          path: [
            {x: 0, y: 0},
            {x: 0, y: -8, z: -12}
          ],
          addTo: page.body2,
          translate: {x: 0, y: 6, z: -5},
          stroke: 2,
          color: pink,
          fill: true,
        });

        // 尾巴第二段
        this.tail2 = new Zdog.Shape({
          path: [
            {x: 0, y: -8, z: -12},
            {x: 0, y: -10, z: -6}
          ],
          addTo: page.tail,
          stroke: 2,
          color: pink,
          fill: true,
        });
        // 尾巴第三段
        new Zdog.Shape({
          path: [
            {x: 0, y: -10, z: -6},
            {x: 0, y: -18, z: -18}
          ],
          addTo: page.tail2,
          stroke: 2,
          color: pink,
          fill: true,
        });

        [-1, 1].forEach(function (xSide) {
          page.eyeGroup = new Zdog.Group({
            addTo: page.face,
            translate: {x: 2.4 * xSide, y: -1},
            rotate: {x: -0.1},
          });
          // eye
          new Zdog.Ellipse({
            width: 1.4,
            height: 5.5,
            addTo: page.eyeGroup,
            stroke: 1,
            color: black,
            fill: true,
          });
          // eye highlight
          new Zdog.Ellipse({
            width: 1,
            height: 2,
            addTo: page.eyeGroup,
            translate: {y: -1.2, z: 0.5},
            stroke: 0.5,
            color: '#FFF',
            fill: true,
          });

          // cheek holder
          page.cheekHolder = new Zdog.Anchor({
            addTo: page.body,
            rotate: {y: 0.6 * xSide},
          });

          new Zdog.Ellipse({
            width: 2.5,
            height: 1,
            translate: {y: 2, z: 10.5},
            addTo: page.cheekHolder,
            color: blush,
            stroke: 1,
          });

        });

// mouth
        new Zdog.Shape({
          path: [
            {x: 0, y: 0},
            {
              bezier: [
                {x: 1.1, y: 0},
                {x: 1.1, y: 0.2},
                {x: 1.1, y: 0.5},
              ]
            },
            {
              bezier: [
                {x: 1.1, y: 1.1},
                {x: 0.2, y: 1.8},
                {x: 0, y: 1.8},
              ]
            },
            {
              bezier: [
                {x: -0.2, y: 1.8},
                {x: -1.1, y: 1.1},
                {x: -1.1, y: 0.5},
              ]
            },
            {
              bezier: [
                {x: -1.1, y: 0.2},
                {x: -1.1, y: 0},
                {x: 0, y: 0},
              ]
            },
          ],
          addTo: page.face,
          translate: {y: 3, z: -0.5},
          stroke: 1,
          color: red,
          fill: true,
        });


        this.rightArm = new Zdog.Shape({
          path: [
            {x: 0, y: 0},
            {x: 0, y: -8},
            {x: 5, y: -5}
          ],
          addTo: page.body,
          translate: {x: -9, y: -5, z: 0},
          color: pink,
          stroke: 2,
          fill: true
        });
// 右耳朵里面
        new Zdog.Ellipse({
          width: 1,
          height: 2,
          addTo: page.rightArm,
          translate: {x: 2, y: -4, z: 0.6},
          stroke: 0.5,
          color: '#fff4ab',
          fill: true,
        });

        this.leftArm = new Zdog.Shape({
          path: [
            {x: 5, y: 5},
            {x: 0, y: 0},
            {x: 5, y: -5}
          ],
          addTo: page.body,
          translate: {x: 5, y: -6, z: 0},
          color: pink,
          stroke: 2,
          fill: true
        });

// 左耳朵里面
        new Zdog.Ellipse({
          width: 1,
          height: 2,
          addTo: page.leftArm,
          translate: {x: 4, y: -2, z: 1.2},
          stroke: 0.5,
          color: '#fff4ab',
          fill: true,
        });


        this.rightArm2 = new Zdog.Shape({
          path: [
            {x: 0, y: 0},
            {x: -6, y: -7},
          ],
          addTo: page.body2,
          translate: {x: -6, y: -2, z: 0},
          color: pink,
          stroke: 7,
        });

// left arm
        this.rightArm2.copy({
          path: [
            {x: 0, y: 0},
            {x: 6, y: -2},
          ],
          translate: {x: 6, y: -2, z: 0},
        });

        // right foot
        this.rightFoot = new Zdog.Shape({
          path: [
            {x: 0, y: -2},
            {
              arc: [
                {x: 2, y: -2},
                {x: 2, y: 0},
              ]
            },
            {
              arc: [
                {x: 2, y: 5},
                {x: 0, y: 5},
              ]
            },
            {
              arc: [
                {x: -2, y: 5},
                {x: -2, y: 0},
              ]
            },
            {
              arc: [
                {x: -2, y: -2},
                {x: 0, y: -2},
              ]
            },
          ],
          addTo: page.body2,
          translate: {x: -1, y: 9, z: -9},
          rotate: {z: 0.2},
          stroke: 6,
          color: shoe,
          fill: true,
          closed: false,
        });

        this.rightFoot.copy({
          translate: {x: 9.5, y: 6, z: -6},
          rotate: {z: -1.1, y: 0.8},
        });


        // ----- umbrella ----- //

        // umbrella rod
        this.umbrella = new Zdog.Shape({
          path: [
            {y: 0},
            {y: 22},
          ],
          addTo: page.rightArm,
          translate: {x: -5, y: -20.5, z: -2},
          rotate: {y: 0.5},
          color: yellow,
          stroke: 1,
        });

        // star shape
        this.star = new Zdog.Shape({
          path: page.starPath(),
          addTo: page.umbrella,
          translate: {y: -4.5},
          stroke: 2,
          color: yellow,
          fill: true,
        });

        // umbrella handle
        new Zdog.Shape({
          path: [
            {z: 0, y: 0},
            {z: 0, y: 1},
            {
              arc: [
                {z: 0, y: 4},
                {z: 3, y: 4},
              ]
            },
            {
              arc: [
                {z: 6, y: 4},
                {z: 6, y: 1},
              ]
            },
          ],
          addTo: page.umbrella,
          translate: {y: 23},
          stroke: 2,
          color: '#37F',
          closed: false,
        });

        // umbrella shield panels
        (function () {
          let umbPanelX = 14 * Math.sin(page.TAU / 24);
          let umbPanelZ = 14 * Math.cos(page.TAU / 24);
          for (var i = 0; i < 12; i++) {
            let colorSide = Math.floor(i / 2) % 2;
            new Zdog.Shape({
              path: [
                {x: 0, y: 0, z: 0},
                {
                  arc: [
                    {x: -umbPanelX, y: 0, z: umbPanelZ},
                    {x: -umbPanelX, y: 14, z: umbPanelZ},
                  ]
                },
                {x: umbPanelX, y: 14, z: umbPanelZ},
                {
                  arc: [
                    {x: umbPanelX, y: 0, z: umbPanelZ},
                    {x: 0, y: 0, z: 0},
                  ]
                },
              ],
              addTo: page.umbrella,
              rotate: {y: page.TAU / 12 * i},
              stroke: 1,
              color: colorSide ? red : 'white',
              fill: true,
            });
          }
        })();

        // floater stars
        (function () {
          for (var i = 0; i < 6; i++) {
            let starHolder = new Zdog.Anchor({
              addTo: page.umbrella,
              translate: {y: 10},
              rotate: {y: page.TAU / 6 * i + page.TAU / 24},
            });
            page.star.copy({
              addTo: page.starHolder,
              translate: {z: 28},
            });
          }
        })();
      },
      starPath() {
        // star
        let page = this;
        return (function () {
          let path = [];
          let starRadiusA = 3;
          let starRadiusB = 1.7;
          for (var i = 0; i < 10; i++) {
            let radius = i % 2 ? starRadiusA : starRadiusB;
            let angle = page.TAU * i / 10 + page.TAU / 4;
            let point = {
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
            };
            path.push(point);
          }
          return path;
        })();
      },
      animate() {
        this.illo.rotate.y += this.isSpinning ? +0.03 : 0;
        this.illo.updateRenderGraph();
        requestAnimationFrame(this.animate);
      },
    },
    mounted () {
      tools.loadScript(window.Zdog, URL).then(res => {
        Zdog = window.Zdog;
        this.isSpinning = this.move
        this.TAU = Zdog.TAU;
        this.initModule();
        this.animate();
      });
    }
  };
</script>

<style scoped>
    canvas {
        display: block;
        width: 140px;
        height: 200px;
        cursor: move;
        position: absolute;
        top: -60px;
        right: -20px;
        z-index: 100;
    }
</style>