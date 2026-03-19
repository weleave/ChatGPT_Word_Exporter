import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Document, Packer, Paragraph, TextRun } from "docx";
import {
  convertLatex2Math,
  convertMathMl2Math,
  mathJaxReady,
} from "@hungknguyen/docx-math-converter";

await mathJaxReady();

const documentFile = new Document({
  sections: [
    {
      children: [
        new Paragraph({
          children: [new TextRun("Smoke test")],
        }),
        new Paragraph({
          children: [convertLatex2Math("\\frac{a+b}{c}=d")],
        }),
        new Paragraph({
          children: [
            convertMathMl2Math(`
              <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
                <mrow>
                  <msup>
                    <mi>x</mi>
                    <mn>2</mn>
                  </msup>
                  <mo>+</mo>
                  <msup>
                    <mi>y</mi>
                    <mn>2</mn>
                  </msup>
                  <mo>=</mo>
                  <mn>1</mn>
                </mrow>
              </math>
            `),
          ],
        }),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(documentFile);
await writeFile(resolve(process.cwd(), "smoke-test.docx"), buffer);

console.log("Smoke test document written to smoke-test.docx");
