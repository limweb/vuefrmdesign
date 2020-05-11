    import VueDragResize from './vue-drag-resize.js';
    import toolbar from "./components/toolbar/toolbar.js";
    import "./icons/lock.js";
    import "./icons/toBottom.js";
    import "./icons/toTop.js";


    export default {
        name: 'app',
        template:`
            <div id="app">
                <div class="list" id="list" 
                    style="
                    background-image: url(/img/inv1.png);
                    background-repeat: no-repeat;
                    background-position: top center;
                    background-size: contain;
                    "
                  >
                    <VueDragResize
                                v-for="(rect, index) in rects"
                                :key="index"
                                :w="rect.width"
                                :h="rect.height"
                                :x="rect.left"
                                :y="rect.top"
                                :parentW="listWidth"
                                :parentH="listHeight"
                                :axis="rect.axis"
                                :isActive="rect.active"
                                :minw="rect.minw"
                                :minh="rect.minh"
                                :isDraggable="rect.draggable"
                                :isResizable="rect.resizable"
                                :parentLimitation="rect.parentLim"
                                :snapToGrid="rect.snapToGrid"
                                :aspectRatio="rect.aspectRatio"
                                :z="rect.zIndex"
                                :text="rect.text"
                                v-on:activated="activateEv(index)"
                                v-on:deactivated="deactivateEv(index)"
                                v-on:dragging="changePosition($event, index)"
                                v-on:resizing="changeSize($event, index)"
                    >
                        <div class="filler"  :style="{backgroundColor:rect?.colorx}">{{rect.text}}</div>
                    </VueDragResize>
                </div>

                <toolbar></toolbar>
            </div>
        `,
        components: {
            VueDragResize,
            toolbar
        },
        data(){
            return {
                listWidth: 0,
                listHeight: 0
            }
        },

        mounted() {
            let listEl = document.getElementById('list');
            this.listWidth = listEl.clientWidth;
            this.listHeight = listEl.clientHeight;

            window.addEventListener('resize', ()=>{
                this.listWidth = listEl.clientWidth;
                this.listHeight = listEl.clientHeight;
            })
        },

        computed: {
            rects() {
                return this.$store.state.rect.rects
            }
        },

        methods: {
            activateEv(index) {
                this.$store.dispatch('rect/setActive', {id: index});
            },

            deactivateEv(index) {
                this.$store.dispatch('rect/unsetActive', {id: index});
            },

            changePosition(newRect, index) {

                this.$store.dispatch('rect/setTop', {id: index, top: newRect.top});
                this.$store.dispatch('rect/setLeft', {id: index, left: newRect.left});
                this.$store.dispatch('rect/setWidth', {id: index, width: newRect.width});
                this.$store.dispatch('rect/setHeight', {id: index, height: newRect.height});
            },

            changeSize(newRect, index) {
                this.$store.dispatch('rect/setTop', {id: index, top: newRect.top});
                this.$store.dispatch('rect/setLeft', {id: index, left: newRect.left});
                this.$store.dispatch('rect/setWidth', {id: index, width: newRect.width});
                this.$store.dispatch('rect/setHeight', {id: index, height: newRect.height});
            }
        }
    }