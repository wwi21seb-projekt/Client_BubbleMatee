<script>

	import { Avatar } from "@skeletonlabs/skeleton";

</script>

<div class="card bg-red m-10 card-hover w-1/3">
    <header>
        <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Avatar src="src/images/layout/logo.png" width="w-8" />
              <h6 class="font-bold ml-2" data-toc-ignore>By Alex</h6>
            </div>
            <small>On {new Date().toLocaleDateString()}</small>
          </div>
          
    </header>
    <img src="src/images/layout/logo.png" class="bg-black/50  w-max h-auto" alt="Post" />
    <div class="p-4 space-y-4">
        <article>
            <p>
                <!-- cspell:disable -->
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet eligendi cumque consequatur tempore
                sint nisi sapiente. Iste beatae laboriosam iure molestias cum expedita architecto itaque quae rem.
                <!-- cspell:enable -->
            </p>
        </article>
    </div>
    <hr class="opacity-50" />
    <footer class="p-4 flex justify-start items-center space-x-4">
        
    </footer>
</div>
