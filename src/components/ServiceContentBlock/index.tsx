import Image from 'next/image'
import RichText from '@/components/RichText'
import { Gutter } from '@/components/Gutter'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical' // adjust if needed

interface ContentBlock {
  contentType: string
  text: DefaultTypedEditorState
  image?:
    | {
        url: string
        alt?: string
      }
    | string
    | null
  backgroundColor?: string
}

interface Props {
  content: ContentBlock[]
}

export default function ContentBlocks({ content }: Props) {
  return (
    <>
      {content.map((block, i) => {
        if (block.contentType === 'text-image') {
          return (
            <section key={i} className="py-12 lg:py-16">
              <Gutter>
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Image */}
                  {block.image && typeof block.image === 'object' && 'url' in block.image && (
                    <div className="order-2 lg:order-1">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                          src={block.image.url}
                          alt={block.image.alt || ''}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  )}
                  {/* Text */}
                  <div className="order-1 lg:order-2">
                    <div className="text-justify">
                      <RichText data={block.text} />
                    </div>
                  </div>
                </div>
              </Gutter>
            </section>
          )
        }

        if (block.contentType === 'full-width') {
          return (
            <section key={i} className="pt-10">
              <Gutter>
                <div>
                  <RichText
                    className={`max-w-full rounded-xl sm:p-8 md:p-12 text-center bg-${block.backgroundColor || 'gray-50'}`}
                    data={block.text}
                  />
                </div>
              </Gutter>
            </section>
          )
        }

        return null
      })}
    </>
  )
}
