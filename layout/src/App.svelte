<script>
  import './app.css';
</script>

<header class="fixed inset-x-0 top-0 flex items-center justify-end h-14 px-4">
  <p>hello</p>
</header>

<nav class="fixed inset-y-0 min-w-[320px] h-screen">
  <ol>
    <li class="text-white text text-4xl">checkout</li>
    <li>Product</li>
  </ol>
</nav>

<style>
  /* Move main when layout is used */
  :global(main) {
    margin-left: 320px;
    margin-top: 3.5rem;
    min-height: calc(100vh - 3.5rem);
  }
</style>
