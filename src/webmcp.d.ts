/**
 * WebMCP declarative annotations are not in Astro's built-in HTML typings yet —
 * the API is still shipping behind an origin trial — so the attributes are
 * declared here rather than silenced with `any` at each call site.
 *
 * Spec: https://developer.chrome.com/docs/ai/webmcp/declarative-api
 */
declare namespace astroHTML.JSX {
  interface FormHTMLAttributes {
    /** Names the form as an agent-callable tool. */
    toolname?: string
    /** Explains, for an agent, what invoking the tool does. */
    tooldescription?: string
    /** Submits the form as soon as an agent invokes the tool. */
    toolautosubmit?: boolean
    /**
     * Valid HTML on <form> (same token set as <a>), just missing from Astro's
     * FormHTMLAttributes.
     */
    rel?: string
  }

  interface InputHTMLAttributes {
    /** Maps this field to a property description in the generated JSON Schema. */
    toolparamdescription?: string
  }

  interface TextareaHTMLAttributes {
    toolparamdescription?: string
  }

  interface SelectHTMLAttributes {
    toolparamdescription?: string
  }
}
