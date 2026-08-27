import appStoreBadge from '../assets/Download_on_the_App_Store_Badge.svg'
import googlePlayBadge from '../assets/google-play-badge.svg'

type StoreButtonsProps = {
  variant?: 'primary' | 'secondary'
  appStoreHref?: string
  googlePlayHref?: string
}

const placeholderAppStore = 'https://apps.apple.com/app/be-positive-life-planner/id6760747846'
const placeholderGooglePlay = 'https://play.google.com/store/apps/details?id=com.bepositive.mobile'

/** Width comes from each SVG’s intrinsic aspect ratio; only height is set here. */
const badgeImgClass =
  'block h-10 w-auto max-w-none shrink-0 object-contain sm:h-11'

export function StoreButtons({
  variant = 'primary',
  appStoreHref = placeholderAppStore,
  googlePlayHref = placeholderGooglePlay,
}: StoreButtonsProps) {
  const linkBase =
    'group inline-flex w-fit shrink-0 overflow-visible rounded-xl transition motion-reduce:transition-none focus-ring hover:scale-[1.02] hover:drop-shadow-[0_6px_22px_rgba(255,244,92,0.45)]'

  const link =
    variant === 'secondary'
      ? `${linkBase} ring-1 ring-slate-200/80 hover:ring-brandYellow/50`
      : linkBase

  return (
    <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-4">
      <a
        href={appStoreHref}
        className={link}
        aria-label="Download on the App Store"
      >
        <img
          src={appStoreBadge}
          alt=""
          width={120}
          height={40}
          decoding="async"
          className={badgeImgClass}
        />
      </a>
      <a
        href={googlePlayHref}
        className={link}
        aria-label="Get it on Google Play"
      >
        <img
          src={googlePlayBadge}
          alt=""
          width={140}
          height={40}
          decoding="async"
          className={badgeImgClass}
        />
      </a>
    </div>
  )
}
