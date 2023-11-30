<script lang="ts">
  import { match } from "ts-pattern";
  const { people, color } = $props<{
    people: string;
    color: string;
  }>();
  const speaker = `${people} พูดว่า`
</script>

<div
  role="cell"
  aria-hidden
  style:--color={color}
  style:--bg-color={color + "22"}
  data-nrm-component="chat"
  class="nrm-chat no-prose border-l-4 py-4 border-[var(--color)] bg-[var(--bg-color)] pl-4 my-4"
>

  <div class="sr-only">{speaker}</div>
  <div aria-hidden={true} class="font-bold mb-3 not-sr-only">{people}</div>
  <div class="prose" aria-hidden>
    <slot />
  </div>
</div>
