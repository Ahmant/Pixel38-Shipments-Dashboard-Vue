<template>
    <div class="text-white font-bold border-0 rounded shadow-lg p-3 mb-2" style="min-width: 350px" role="alert" :class="getBgClass(type)">
        <span class="alert-icon">
            <i :class="icon" />
        </span>
        <span>
            <slot>
				<h4 v-if="title" class="text-white font-bold">{{ title }}</h4>
				<p v-if="body" class="mb-0">{{ body}}</p>
			</slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "argon-alert",
        props: {
            type: {
                type: String,
                default: "success",
            },
            icon: String,
            title: String,
            body: String,
        },
        methods: {
            getBgClass: (type) => {
                let className;

                switch (type) {
                    case 'success':
                        className = 'bg-green-500';
                        break;
                    case 'error':
                        className = 'bg-red-500';
                        break;
                    case 'warning':
                        className = 'bg-amber-500';
                        break;
                    case 'info':
                        className = 'bg-sky-500';
                        break;
                }


                return className;
            },
        },
    };
</script>
