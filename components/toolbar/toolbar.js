export default { 
    template: `
        <div class="toolbar"  @mousedown.stop>
            <div class="toolbar-wh-row">
                    Select Paper:<select name="" id="">
                        <option value="A4">A4</option>
                        <option value="A4">A4F</option>
                        <option value="A4">A3</option>
                        <option value="A4">A5</option>
                    </select>
            </div>
            <div class="toolbar-wh-row">
                <label>Image Template: <input type="file" /></label>
            </div>
            <div class="toolbar-wh-row">
                <label>Width:<input type="text" /></label>
                <label>Height:<input type="text" /></label>
            </div>
            <div class="toolbar-wh-row">
                <label>Top:<input type="text" /></label>
                <label>Left:<input type="text" /></label>
            </div>
            <div style="margin-bottom:20px;" ><button @click="addnew"
            style="width:100%">Add Text Item</button></div>
            <div class="toolbar-wh-row">
                <p class="toolbar-row-title">Position</p>
                <span class="toolbar-position-inp">top
                    <input :value="top" @keyup="changeTop" />

                    <svgicon name="lock"
                            :color="topIsLocked ? '#42b983 #35495e' : '#AAA'"
                            width="15"
                            height="15"
                            class="position-lock-icon"
                            @click.native="toggleYLock"
                    ></svgicon>
                </span>
                <span class="toolbar-position-inp">left
                    <input :value="left" @keyup="changeLeft" />
                    <svgicon name="lock"
                            :color="leftIsLocked ? '#42b983 #35495e' : '#AAA'"
                            width="15"
                            height="15"
                            class="position-lock-icon"
                            @click.native="toggleXLock"
                    ></svgicon>
                </span>
            </div>
            <div class="toolbar-wh-row">
                <p class="toolbar-row-title">Size</p>
                <span class="toolbar-size-inp">width
                    <input :value="width" @keyup="changeWidth" />
                    <svgicon name="lock"
                            :color="aspectRatio ? '#42b983 #35495e' : '#AAA'"
                            width="17"
                            height="17"
                            class="size-lock-icon"
                            @click.native="toggleAspect"
                    ></svgicon>
                </span>
                <span class="toolbar-size-inp">height
                    <input :value="height" @keyup="changeHeight" />
                </span>
            </div>
            <div class="toolbar-wh-row">
                <span class="toolbar-size-inp">Text: <input :value="text"  /></span>
            </div>
            <div class="toolbar-wh-row">
                <span class="toolbar-size-inp">Align Text: <input :value="text"  /></span>
                <span class="toolbar-size-inp">Blod Text: <input type="checkbox"   /></span>
            </div>
            <div class="toolbar-wh-row">
                <p class="toolbar-row-title">Minimal size</p>
                <span class="toolbar-size-inp">width
                    <input :value="minw" :disabled="activeRect === null" @keyup="changeMinWidth" />
                </span>
                <span class="toolbar-size-inp">height
                    <input :value="minh" :disabled="activeRect === null" @keyup="changeMinHeight" />
                </span>
            </div>

            <div class="toolbar-wh-row">
                <p class="toolbar-row-title">Restrictions</p>
                <label class="toolbar-check-inp"><input type="checkbox" @change="toggleResizable" :checked="resizable" :disabled="activeRect === null" /> isResizable</label>
                <label class="toolbar-check-inp"><input type="checkbox" @change="toggleDraggable" :checked="draggable" :disabled="activeRect === null" /> isDraggable</label>
                <label class="toolbar-check-inp"><input type="checkbox" @change="toggleSnapToGrid" :checked="snapToGrid" :disabled="activeRect === null" /> snapToGrid</label>
                <label class="toolbar-check-inp"><input type="checkbox" @change="toggleParentLimitation" :checked="parentLim" :disabled="activeRect === null" /> parentLimitation</label>
                
                
                <svgicon name="toBottom" :color="activeRect!==null && zIndex !== 'isFirst' ? '#35495e' : '#AAA'" width="30" height="30" class="to-bottom-icon" @click.native="toBottom"></svgicon>
                <svgicon name="toTop" :color="activeRect!==null && zIndex !== 'isLast' ? '#35495e' : '#AAA'" width="30" height="30" class="to-top-icon" @click.native="toTop"></svgicon>
            </div>

            <div style="display:flex;justify-content: space-around;">
                <button name="toBottom" :color="activeRect!==null && zIndex !== 'isFirst' ? '#35495e' : '#AAA'" width="100" height="50" class="to-bottom-icon" @click.native="toBottom">toBottom</button>
                <button name="toTop" :color="activeRect!==null && zIndex !== 'isLast' ? '#35495e' : '#AAA'" width="100" height="50" class="to-top-icon" @click.native="toTop">totop</button>
            </div>
 
 
            <div style="margin-bottom:10px;" ><button @click="delitem"
                style="width:100%">DEL Active {{activeRect}}</button></div>
            <div style="margin-bottom:10px;" ><button @click="print"
                style="width:100%">Test Print</button></div>
            <div style="margin-bottom:10px;" ><button  
                style="width:100%">Save Project</button></div>
            <div style="margin-bottom:10px;" ><button  
                style="width:100%">Download Vue SFC</button></div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    `, 
    mixins: [], 
    data() { 
      return { 
          theme: 'AdminLte', 
          name: 'Toolbar', 
      }; 
    }, 
    created() { 
      console.log( this.name + 'component is created'); 
    }, 
    mounted() {}, 
        computed: {
        activeRect() {
            return this.$store.getters['rect/getActive'];
        },

        width() {
            return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].width
        },

        height() {
            return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].height
        },

        top() {
            return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].top
        },

        left() {
            return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].left
        },

        minw() {
            return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].minw
        },

        minh() {
            return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].minh
        },

        aspectRatio() {
            return this.activeRect === null ? false : this.$store.state.rect.rects[this.activeRect].aspectRatio;
        },

        parentLim() {
            return this.activeRect === null ? false : this.$store.state.rect.rects[this.activeRect].parentLim;
        },

        draggable() {
            return this.activeRect === null ? false : this.$store.state.rect.rects[this.activeRect].draggable;
        },

        resizable() {
            return this.activeRect === null ? false : this.$store.state.rect.rects[this.activeRect].resizable;
        },

        snapToGrid() {
            return this.activeRect === null ? false : this.$store.state.rect.rects[this.activeRect].snapToGrid;
        },
        text() {
            return this.activeRect === null ? false : this.$store.state.rect.rects[this.activeRect].text;
        },

        topIsLocked() {
            if (this.activeRect === null) {
                return false;
            }
            return (this.$store.state.rect.rects[this.activeRect].axis === 'x' ||
                this.$store.state.rect.rects[this.activeRect].axis === 'none')
        },

        leftIsLocked() {
            if (this.activeRect === null) {
                return false;
            }
            return (this.$store.state.rect.rects[this.activeRect].axis === 'y' ||
                this.$store.state.rect.rects[this.activeRect].axis === 'none')
        },

        zIndex() {
            if (this.activeRect === null) {
                return null;
            }

            return this.$store.state.rect.rects[this.activeRect].zIndex === 1 ? 'isFirst' :
                this.$store.state.rect.rects[this.activeRect].zIndex === this.$store.state.rect.rects.length ? 'isLast' : 'normal'

        }
    },
    methods: {
        print(){
            window.print();
        },
        getRandomColor() {
            var color = '#';
            color += ((1<<24)*Math.random()|0).toString(16);
            return color;
        },
        delitem(){
            if (this.activeRect === null) {
                return
            }
            this.$store.state.rect.rects.splice(this.activeRect,1);
        },
        addnew(){
            let rect = '';
            if (this.activeRect === null) {
                rect = {
                    'width': 200,
                    'height': 150,
                    'top': 10,
                    'left': 10,
                    'draggable': true,
                    'resizable': true,
                    'minw': 10,
                    'minh': 10,
                    'axis': 'both',
                    'parentLim': true,
                    'snapToGrid': false,
                    'aspectRatio': false,
                    'zIndex': 1,
                    'color': this.getRandomColor(),
                    'active': true,
                    'text':'aaaa'
                };
            } else {
                rect = JSON.parse(JSON.stringify(this.$store.state.rect.rects[this.activeRect]));
                rect.top += 5;
                rect.left +=5;
                rect.text ='text';
                rect.color = this.getRandomColor();
                console.log(rect);
            }
            if(rect) {
                let recid = this.$store.state.rect.rects.push(rect);
                rect.text +=recid;
                this.$store.dispatch('rect/setActive', {id: recid-1 });
            }  
        },
        toggleYLock() {
            if (this.activeRect === null) {
                return
            }

            this.$store.dispatch('rect/changeYLock', {id: this.activeRect});
        },
        toggleXLock() {
            if (this.activeRect === null) {
                return
            }

            this.$store.dispatch('rect/changeXLock', {id: this.activeRect});
        },

        toggleAspect() {
            if (this.activeRect === null) {
                return
            }
            if (!this.$store.state.rect.rects[this.activeRect].aspectRatio) {
                this.$store.dispatch('rect/setAspect', {id: this.activeRect});
            } else {
                this.$store.dispatch('rect/unsetAspect', {id: this.activeRect});
            }
        },

        toggleParentLimitation() {
            this.$store.dispatch('rect/toggleParentLimitation', {id: this.activeRect});
        },

        toggleResizable() {
            this.$store.dispatch('rect/toggleResizable', {id: this.activeRect});
        },

        toggleDraggable() {
            this.$store.dispatch('rect/toggleDraggable', {id: this.activeRect});
        },

        toggleSnapToGrid() {
            this.$store.dispatch('rect/toggleSnapToGrid', {id: this.activeRect});
        },

        toTop() {
            this.$store.dispatch('rect/changeZToTop', {id: this.activeRect});
        },

        toBottom() {
            this.$store.dispatch('rect/changeZToBottom', {id: this.activeRect});
        },

        changeMinWidth(ev) {
            let minw = parseInt(ev.target.value);
            if (typeof minw !== 'number' || isNaN(minw)) {
                minw = 1;
            }

            if (minw <= 0) {
                minw = 1;
            } else if (minw > this.$store.state.rect.rects[this.activeRect].width) {
                minw = this.$store.state.rect.rects[this.activeRect].width;
            }

            ev.target.value = minw;

            this.$store.dispatch('rect/setMinWidth', {id: this.activeRect, width: minw});
        },

        changeMinHeight(ev) {
            let minh = parseInt(ev.target.value);

            if (typeof minh !== 'number' || isNaN(minh)) {
                minh = 1;
            }

            if (minh <= 0) {
                minh = 1;
            } else if (minh > this.$store.state.rect.rects[this.activeRect].height) {
                minh = this.$store.state.rect.rects[this.activeRect].height;
            }

            ev.target.value = minh;

            this.$store.dispatch('rect/setMinHeight', {id: this.activeRect, height: minh});
        },

        changeTop(ev) {
            let top = parseInt(ev.target.value);

            if (typeof top !== 'number' || isNaN(top)) {
                top = this.$store.state.rect.rects[this.activeRect].top;
                ev.target.value = top;
                return
            }

            this.$store.dispatch('rect/setTop', {id: this.activeRect, top: top});
        },

        changeLeft(ev) {
            let left = parseInt(ev.target.value);

            if (typeof left !== 'number' || isNaN(left)) {
                left = this.$store.state.rect.rects[this.activeRect].left;
                ev.target.value = left;
            }

            this.$store.dispatch('rect/setLeft', {id: this.activeRect, left: left});
        },

        changeWidth(ev){
            let width = parseInt(ev.target.value);

            if (typeof width !== 'number' || isNaN(width)) {
                width = this.$store.state.rect.rects[this.activeRect].width;
                ev.target.value = width;
            }

            this.$store.dispatch('rect/setWidth', {id: this.activeRect, width: width});
        },

        changeHeight(ev){
            let height = parseInt(ev.target.value);

            if (typeof height !== 'number' || isNaN(height)) {
                height = this.$store.state.rect.rects[this.activeRect].height;
                ev.target.value = height;
            }

            this.$store.dispatch('rect/setHeight', {id: this.activeRect, height: height});
        }
    },
    components:{} 
}; 