<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content">
            <h2>サーバとの通信で障害が起きました。</h2>
            <p class="modal-text">
              お手数ですが、再読み込みをお願いいたします。<br>
              再読み込みしても直らない場合、ご迷惑をおかけしますが<br>
              時間をおいて再度アクセスいただければと思います。
            </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data: function() {
    return {
      isOpen: false
    };
  },
  methods: {
    open: function() {
      this.isOpen = true;
    }
  }
};
</script>
<style scoped>
h2 {
  color: #696969;
}

.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-window {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  width: 50vw;
}

.modal-text {
  color: #696969;
  text-align: left;
}

.modal-content {
  padding: 10px 20px 10px 30px;
}

.modal-footer {
  background: #ccc;
  padding: 10px;
  text-align: right;
}

/* オーバーレイのトランジション */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;  
}

/* オーバーレイに包含されているモーダルウィンドウのトランジション */
.modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

/* ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える */
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}

.modal-window {
  opacity: 0;
  transform: translateY(-20px);
}
</style>