import { Head, Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { ProfileAvatar, ProfileBackIcon, ProfileEditor, ProfileField } from './components';
import { useProfile } from './useProfile';

export default function Profile() {
    const {
        user,
        initials,
        profile,
        messages,
        feedUrl,
        activeEditor,
        avatarInputRef,
        avatarError,
        avatarProcessing,
        usernameForm,
        emailForm,
        passwordForm,
        openAvatarPicker,
        handleAvatarChange,
        openUsernameEditor,
        openEmailEditor,
        openPasswordEditor,
        cancelEditor,
        handleUsernameChange,
        handleUsernameCurrentPasswordChange,
        handleEmailChange,
        handleEmailCurrentPasswordChange,
        handlePasswordCurrentPasswordChange,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleUsernameSubmit,
        handleEmailSubmit,
        handlePasswordSubmit,
    } = useProfile();

    return (
        <>
            <Head title={messages.pageTitle} />

            <section className="relative min-h-[calc(100svh-5.375rem)] pt-16 pb-10 lg:pt-8 lg:pr-8">
                <h1 className="ml-30 hidden text-2xl leading-9 font-medium lg:block">
                    {messages.myProfile}
                </h1>

                {activeEditor === null ? (
                    <Link
                        href={feedUrl}
                        aria-label={messages.backToFeed}
                        className="absolute top-4 left-16 inline-flex size-8 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:hidden"
                    >
                        <ProfileBackIcon className="size-8" />
                    </Link>
                ) : (
                    <button
                        type="button"
                        onClick={cancelEditor}
                        aria-label={messages.cancel}
                        className="absolute top-4 left-16 inline-flex size-8 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:hidden"
                    >
                        <ProfileBackIcon className="size-8" />
                    </button>
                )}

                <div
                    className={cn(
                        'relative min-h-191.25 w-full rounded-t-xl bg-[#24222f] pt-6 pb-8 lg:mt-13.5 lg:mr-8 lg:ml-15 lg:min-h-0 lg:w-auto lg:max-w-249.5 lg:rounded-none lg:bg-transparent lg:pt-18.25 lg:pb-0',
                        activeEditor !== null &&
                            'max-lg:min-h-0 max-lg:rounded-none max-lg:bg-transparent max-lg:pt-0 max-lg:pb-0',
                    )}
                >
                    <div className="lg:min-h-175.75 lg:rounded-xl lg:bg-[#11101a] lg:pt-48.5 lg:pb-17">
                        <div
                            className={cn(
                                'lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2',
                                activeEditor !== null && 'max-lg:hidden',
                            )}
                        >
                            <ProfileAvatar
                                avatarUrl={user.avatar}
                                initials={initials}
                                username={user.username}
                                uploadLabel={messages.uploadNewPhoto}
                                inputRef={avatarInputRef}
                                error={avatarError}
                                processing={avatarProcessing}
                                onChoose={openAvatarPicker}
                                onChange={handleAvatarChange}
                            />
                        </div>

                        <div
                            className={cn(
                                'mx-auto mt-15 w-full max-w-169.25 px-8 lg:mt-0 lg:px-8',
                                activeEditor !== null && 'max-lg:mt-0',
                            )}
                        >
                            <div
                                className={cn(
                                    'grid gap-7.75 lg:gap-10',
                                    activeEditor !== null && 'max-lg:hidden',
                                )}
                            >
                                <ProfileField
                                    label={messages.username}
                                    value={user.username}
                                    editLabel={messages.edit}
                                    onEdit={openUsernameEditor}
                                />
                                <ProfileField
                                    label={messages.email}
                                    value={user.email}
                                    editLabel={messages.edit}
                                    pendingLabel={messages.pendingEmail}
                                    pendingValue={profile.pendingEmail}
                                    onEdit={profile.isPasswordless ? undefined : openEmailEditor}
                                />
                                {!profile.isPasswordless && (
                                    <ProfileField
                                        label={messages.password}
                                        value={messages.hiddenPassword}
                                        editLabel={messages.edit}
                                        onEdit={openPasswordEditor}
                                    />
                                )}
                            </div>

                            <ProfileEditor
                                activeEditor={activeEditor}
                                requiresCurrentPassword={!profile.isPasswordless}
                                messages={messages}
                                username={usernameForm.data.username}
                                usernameCurrentPassword={usernameForm.data.current_password}
                                usernameErrors={usernameForm.errors}
                                usernameProcessing={usernameForm.processing}
                                email={emailForm.data.email}
                                emailCurrentPassword={emailForm.data.current_password}
                                emailErrors={emailForm.errors}
                                emailProcessing={emailForm.processing}
                                passwordCurrentPassword={passwordForm.data.current_password}
                                password={passwordForm.data.password}
                                passwordConfirmation={passwordForm.data.password_confirmation}
                                passwordErrors={passwordForm.errors}
                                passwordProcessing={passwordForm.processing}
                                onUsernameChange={handleUsernameChange}
                                onUsernameCurrentPasswordChange={
                                    handleUsernameCurrentPasswordChange
                                }
                                onEmailChange={handleEmailChange}
                                onEmailCurrentPasswordChange={handleEmailCurrentPasswordChange}
                                onPasswordCurrentPasswordChange={
                                    handlePasswordCurrentPasswordChange
                                }
                                onPasswordChange={handlePasswordChange}
                                onPasswordConfirmationChange={handlePasswordConfirmationChange}
                                onUsernameSubmit={handleUsernameSubmit}
                                onEmailSubmit={handleEmailSubmit}
                                onPasswordSubmit={handlePasswordSubmit}
                                onCancel={cancelEditor}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
