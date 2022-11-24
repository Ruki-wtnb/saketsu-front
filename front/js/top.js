

var VueMasonryPlugin = window["vue-masonry-plugin"].VueMasonryPlugin
Vue.use(VueMasonryPlugin)

prefectures = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"]

sortContents = [
    {"name": "日本酒度-昇順", "value": "SakeMeterValueAsc"},
    {"name": "日本酒度-降順", "value": "SakeMeterValueDesc"},
    {"name": "アミノ酸度-昇順", "value": "AminoAcidContentAsc"},
    {"name": "アミノ酸度-降順", "value": "AminoAcidContentDesc"},
    {"name": "アルコール度数-昇順", "value": "AlcoholRateAsc"},
    {"name": "アルコール度数-降順", "value": "AlcoholRateDesc"}
]

new Vue({
    el: '#app',
    data: {
        sakes: [],
        prefectures: prefectures,
        sortContents: sortContents,
        meigara: "",
        prefecture: "",
        sort: "",
        isBefore: false,
        isNext: false,
        beforeOffset: 0,
        nextOffset: 0,
        pageNumbers: []
    },
    // TODO 重複した書き方になっているから、1つに統一したい
    async mounted(){
        const res = await fetch('https://sake-api.herokuapp.com/sakes')
        //const res = await fetch('http://localhost:8000/sakes/')
        const json = await res.json()
        this.sakes = json.sakes
        this.isBefore = json.isBefore
        this.isNext = json.isNext,
        this.offset = json.offset,
        this.beforeOffset = json.beforeOffset
        this.nextOffset = json.nextOffset,
        this.pageNumbers = json.pageNumbers
    },
    methods: {
        reMounted : async function(offset=0){

            const params = {
                "name": this.meigara,
                "prefecture": this.prefecture,
                "sort": this.sort,
                "offset": offset
            }

            for(let p in params){
                if(params[p] === "" ||  params[p] === 0){
                    delete params[p]
                }
            }
            const queryParams = new URLSearchParams(params).toString()
            const res = await fetch('https://saketsu-app.azurewebsites.net/v1/sakes?' + queryParams)
            //const res = await fetch(`https://sake-api.herokuapp.com/sakes?` + queryParams)
            //const res = await fetch('http://localhost:8000/sakes/?' + queryParams)
            const json = await res.json()
            this.sakes = json.sakes
            this.isBefore = json.isBefore
            this.isNext = json.isNext,
            this.offset = json.offset,
            this.beforeOffset = json.beforeOffset
            this.nextOffset = json.nextOffset,
            this.pageNumbers = json.pageNumbers
            window.scroll({top: 0, behavior: 'smooth'});
        }
    }
})
